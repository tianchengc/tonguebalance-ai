import { TongueAnalysis, User } from "../types";

const DB_KEY = 'shang_yi_users_db_v1';
const SESSION_KEY = 'shang_yi_current_user';

interface UserData extends User {
  password: string; // In a real app, this should be hashed. Here we simulate storage.
}

type UserDatabase = Record<string, UserData>;

const getDb = (): UserDatabase => {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY) || '{}');
  } catch {
    return {};
  }
};

const saveDb = (db: UserDatabase) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const authService = {
  signup: (username: string, password: string): User | { error: string } => {
    const db = getDb();
    if (db[username]) {
      return { error: 'Username already exists' };
    }

    const newUser: UserData = {
      username,
      password, // Storing plain text for demo purposes only
      history: []
    };

    db[username] = newUser;
    saveDb(db);
    localStorage.setItem(SESSION_KEY, username);
    
    // Return sanitized user object
    const { password: _, ...user } = newUser;
    return user;
  },

  login: (username: string, password: string): User | { error: string } => {
    const db = getDb();
    const user = db[username];

    if (!user || user.password !== password) {
      return { error: 'Invalid username or password' };
    }

    localStorage.setItem(SESSION_KEY, username);
    const { password: _, ...cleanUser } = user;
    return cleanUser;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser: (): User | null => {
    const username = localStorage.getItem(SESSION_KEY);
    if (!username) return null;

    const db = getDb();
    const user = db[username];
    if (!user) return null;

    const { password: _, ...cleanUser } = user;
    return cleanUser;
  },

  updateHistory: (username: string, history: TongueAnalysis[]) => {
    const db = getDb();
    if (db[username]) {
      db[username].history = history;
      saveDb(db);
    }
  }
};