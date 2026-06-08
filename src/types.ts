export interface Comment {
  id: string;
  author: string;
  content: string;
  avatar: string;
  date: string;
}

export interface Post {
  id: string;
  author: string;
  role: 'Commander' | 'Citizen Scientist' | 'Mission Control' | 'Chief Engineer' | 'Climate Analyst';
  avatar: string;
  location: string;
  content: string;
  image?: string;
  imageLabel?: string;
  likes: number;
  likedByMe: boolean;
  comments: Comment[];
  date: string;
  sdgTags: string[]; // e.g. ["SDG 13: Climate Action", "SDG 9: Industry & Innovation"]
  altitude?: number; // relevant for astronauts/satellites
}

export interface Satellite {
  id: string;
  name: string;
  altitude: number; // in km
  velocity: number; // in km/s or km/h
  latitude: number;
  longitude: number;
  status: string;
  pathColor: string;
  sensorTarget?: string;
  tag?: string;
}

export interface Explorer {
  rank: number;
  name: string;
  avatar: string;
  discoveries: number;
}

export interface ActiveMission {
  id: string;
  name: string;
  progress: number;
  eta: string;
  statusText: string;
  color: string;
}

export interface SpaceDiscovery {
  id: string;
  date: string;
  title: string;
  description: string;
  bgClass: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  cameraInfo: string;
  astronaut: string;
  date: string;
  sdgGoal: string;
}
