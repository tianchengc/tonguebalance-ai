export interface TongueAnalysis {
  id: string;
  timestamp: number;
  imageUrl: string;
  symptoms: string;
  tongue_body: {
    color: string;
    shape: string;
    moisture: string;
  };
  coating: {
    color: string;
    thickness: string;
    texture: string;
  };
  pattern: string;
  explanation: string;
  recommendations: {
    diet: {
      eat: string[];
      avoid: string[];
    };
    lifestyle: string[];
    exercise: string;
  };
  suggested_course: {
    name: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  };
}

export interface User {
  username: string;
  history: TongueAnalysis[];
}

export type ViewState = 'home' | 'analyze' | 'history';

export type Language = 'en' | 'zh' | 'fr';
