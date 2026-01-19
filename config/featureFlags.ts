/**
 * Feature Flags Configuration
 * Control feature availability across different environments
 * 
 * Environment-based configuration:
 * - DEVELOPMENT: All features enabled for testing
 * - STAGING: Features staging for production
 * - PRODUCTION: Only production-ready features enabled
 */

export interface FeatureFlags {
  auth: {
    loginButton: boolean;
    userHistory: boolean;
  };
  recommendations: {
    suggestedCourse: boolean;
  };
}

const ENV = process.env.NODE_ENV || 'development';
const FEATURE_ENV = process.env.VITE_FEATURE_ENV || ENV;

/**
 * Default feature flags for development environment
 */
const developmentFlags: FeatureFlags = {
  auth: {
    loginButton: false,
    userHistory: false,
  },
  recommendations: {
    suggestedCourse: false,
  },
};

/**
 * Feature flags for staging environment
 */
const stagingFlags: FeatureFlags = {
  auth: {
    loginButton: false,
    userHistory: false,
  },
  recommendations: {
    suggestedCourse: false,
  },
};

/**
 * Feature flags for production environment
 */
const productionFlags: FeatureFlags = {
  auth: {
    loginButton: false,
    userHistory: false,
  },
  recommendations: {
    suggestedCourse: false,
  },
};

/**
 * Get feature flags based on environment
 */
const getFeatureFlags = (): FeatureFlags => {
  switch (FEATURE_ENV) {
    case 'staging':
      return stagingFlags;
    case 'production':
      return productionFlags;
    case 'development':
    default:
      return developmentFlags;
  }
};

export const featureFlags = getFeatureFlags();

/**
 * Helper function to check if a feature is enabled
 * Usage: isFeatureEnabled('auth.loginButton')
 */
export const isFeatureEnabled = (featurePath: string): boolean => {
  const keys = featurePath.split('.');
  let current: any = featureFlags;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      console.warn(`Feature flag not found: ${featurePath}`);
      return false;
    }
  }
  
  return Boolean(current);
};
