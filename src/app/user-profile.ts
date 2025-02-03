export interface UserProfile {
  name: string;
  age: number;
  email: string;
  intresets: string[];
  settings: UserSettings;
}

export interface UserSettings {
  theme: string;
}
