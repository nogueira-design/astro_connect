import { Post, Satellite, Explorer, ActiveMission, SpaceDiscovery, GalleryItem } from './types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    author: 'Commander Miller',
    role: 'Commander',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqY-1dxGeSd3_4dP6rVjb69QTDDG6G-kRpOMlLpyUAHe13eOsY32EZqCXzfN3T8UXgPskcbRSll475YtcsoCwW95rzId3xVEpPWx6lpEotJvMaNRxUOCfYwBjixQk-GK06OSZX5N8-MZ05EMz8FALdu66qS6dFsF7SQxPoTvquA6TBSkPVsg8suT2YSIAC5YdTrpz7rVc9t9fvpdLUCgZxm5KprIQeLLgFoVL1o7lVrRKf6XumpJqExa0jrM7Z6Em7ULTn5UQHAQ14',
    location: 'ISS - Low Earth Orbit (Orbit 14,289)',
    content: 'Captured this spectacular sunrise over the Andes mountains during my morning exercise routine. Looking closely, the ice caps on the southern peaks show further reduction compared to our telemetry archives from last decade. Planetary health monitoring is crucial. Our sensors show water vapor changes over the South Pacific that we need to study. Telemetry suggests we will be over the Pacific in 14 minutes.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3YnKC7D4GN4NNAvHcviMtzrqy9ZH88MLsexJsWhKu_MEmbID8cvhCnGycrLgsXAsiM4Veev5M_rzlqzim7OsA9BJE5MNr-pEvAm2hnxr0Icg8EqApaI3Bf7e3H9lPxhN9lu6wcoNmh7njME_Hz9FOnCHMMjUdz4Qol_JjM8kkkRxi52Hsa5kK0wxQk1ElLLvu02bfFpPnEdmfBkaEys0opKm1060GNkwNaBx3sV-SfGM9jxjx2Zb0Fr-aKk0YdCMjEWjccoDD3Sni',
    imageLabel: '4K RAW • Nikon Z9 Space Mod',
    likes: 1240,
    likedByMe: false,
    comments: [],
    date: '10m ago',
    sdgTags: ['SDG 13: Climate Action', 'SDG 15: Life on Land'],
    altitude: 408
  },
  {
    id: 'post-2',
    author: 'Elena Voss',
    role: 'Climate Analyst',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJWBUCDNO1WMgKetHq-gupFeNmxkfbPrbb8fmT5uH_3GW9rAx4nHTMeRufj7ismbOgdrwkOd21PRN6AT1fQ49gm4ZL4OOyuuFCyQiWbg2FdMaTwZeHrVMaaqGKwlZH-SVomd392x66-UHE7ABSq2ICpUHXv6ZlT3GNR5M1AeJ_60jaO2XQXrhB6ouBcJNuFfHcrMc_Ay2ji4EgeXKqd9itwhx0nJ6yE2pZg70WpSfdE9QnmOAJR2YS7aoBuqKYwZTYlc5eMDsGsbZq',
    location: 'Geneva Climate Observation Center, Earth',
    content: 'Received Commander Miller\'s multispectral imagery feed. Our automated machine learning pipelines have processed the raw data. The thermal signature anomalies confirm a 2.4% increase in winter runoff speed in the Andean sub-basins. This will aid local agricultural agencies on Earth in preparing sustainable irrigation management models. Aerospace tech-infrastructure in action!',
    likes: 312,
    likedByMe: true,
    date: '1h ago',
    sdgTags: ['SDG 9: Industry & Innovation', 'SDG 6: Clean Water'],
    comments: [
      {
        id: 'comment-2-1',
        author: 'Leo Vane',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN8HODYiuXVgJo9AyMReuPS5ellPTFPWH7hSndRsK2XzZbH7SSyzH21Jyk8ne0DFf6Mrtt-iSIKCadOna28ipc9zsAkvB1T7Wq2QR2s_YlEn2mCQc7O8Kt8czevp8zAwn7kauX0IGZPt6QjKCeKhq-XYlfznLrNrq-cx-dEGZqw4tF_AW2slSPWA-u6WkjDGo0h9YYNFPE5el8iczULxjmQEVfRHZz6FIWsv8TxK3-JHiSOQcdhckU2wfPg6CUGKmUUSQsxZ77Cnza',
        content: 'Fascinating analysis! It shows how orbital surveillance can protect terrestrial vulnerable communities directly.',
        date: '45m ago'
      }
    ]
  },
  {
    id: 'post-3',
    author: 'Dr. Aris Thorne',
    role: 'Citizen Scientist',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE9vyQJz38eIeQAaYdLkK24uyK6-X9IM5Nip0JqVIzYMwV6zVxdicMOBq4PNbnlLyhkPzG4muA1juLhkmAcw9wP9vCRmVXqNaiA_tg_Y9pb2ghdBM_FX21fZ6muxjIcC0g7nULxZ7KlxSAm-Ym-Wty1iPAAQAzKcrEwKP_oem0w-C_jIhvPhpBC6EuIJS383xPvuLlrT2XHHOqICyymFedCuUSr8QSOBkHV-cWmpFo5i_tGsIkmTlbyfY1EnhFfGzcslZdv4qZyHRk',
    location: 'Valles Marineris Base, Mars',
    content: 'Initial spectral analysis of the core samples from Martian Sector 4-B indicates an exceptionally high concentration of silicate-perovskite matrix layers. This structure strongly supports theories for geothermal heat preservation. Understanding Martian volcanic historical activity can unlock insights on early planetary evolution of Earth itself. Full geochemical mineral reports uploaded to the archive.',
    likes: 942,
    likedByMe: false,
    date: '3h ago',
    sdgTags: ['SDG 9: Industry & Innovation'],
    comments: [
      {
        id: 'comment-3-1',
        author: 'Marcus Kael',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpIg_-RkCNL174THwMbIM_-7skmsXWuGN7chaFkYw9Kzsf9CjeIq2h7MXAJgQdJdenTTA-Kgo41r22jdz8ZGfop34YbJj5TC7edpXRLlK9a23dP6ylNIfvjjd9Uc80Q1steDR5vgE2IIWYmXJqoUVVwzzqVor6xYh-oN6YYaguq9B1SgtPisSaEPhHmM1D46HZacln6q2ijt5bqNXJXtSphtGn4Q8nJ35ujh-4-_NzIFwHtCwagvY04ke21ZulXXIWifVNhsi1S2ah',
        content: 'This chemical composition aligns perfectly with the geological mapping of Olympus Mons foothills. Outstanding finding, Aris!',
        date: '2h ago'
      }
    ]
  },
  {
    id: 'post-4',
    author: 'Chief Engineer Scott',
    role: 'Chief Engineer',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN8HODYiuXVgJo9AyMReuPS5ellPTFPWH7hSndRsK2XzZbH7SSyzH21Jyk8ne0DFf6Mrtt-iSIKCadOna28ipc9zsAkvB1T7Wq2QR2s_YlEn2mCQc7O8Kt8czevp8zAwn7kauX0IGZPt6QjKCeKhq-XYlfznLrNrq-cx-dEGZqw4tF_AW2slSPWA-u6WkjDGo0h9YYNFPE5el8iczULxjmQEVfRHZz6FIWsv8TxK3-JHiSOQcdhckU2wfPg6CUGKmUUSQsxZ77Cnza',
    location: 'ISS Solar Array Beta',
    content: 'Just finished the EV maintenance walk to align the solar panel trackers at the port side of Station Alpha. Real-time solar cell efficiency has jumped to 96.5% under clear rays. Providing zero-emissions electric power for our environmental simulation modules, life support generators, and deep space communication array. A great example of green infrastructure.',
    likes: 1054,
    likedByMe: false,
    comments: [],
    date: '5h ago',
    sdgTags: ['SDG 7: Affordable & Clean Energy', 'SDG 9: Industry & Innovation'],
    altitude: 412
  }
];

export const INITIAL_SATELLITES: Satellite[] = [
  {
    id: 'sat-1',
    name: 'ISS - Station Alpha',
    altitude: 408,
    velocity: 27560,
    latitude: -15.42,
    longitude: -68.31,
    status: 'ACTIVE',
    pathColor: '#00F2FF',
    sensorTarget: 'Andes Glacial Runoff',
    tag: 'Primary Ingress Tracking'
  },
  {
    id: 'sat-2',
    name: 'Copernicus Sentinel-5',
    altitude: 817,
    velocity: 26800,
    latitude: 35.68,
    longitude: 139.69,
    status: 'OPTIMAL',
    pathColor: '#ADC6FF',
    sensorTarget: 'Tokyo Urban CO2 Mapping',
    tag: 'Climate monitoring sensor'
  },
  {
    id: 'sat-3',
    name: 'Aqua NASA EOS',
    altitude: 705,
    velocity: 27010,
    latitude: 51.50,
    longitude: -0.12,
    status: 'ACTIVE',
    pathColor: '#A3E635',
    sensorTarget: 'North Atlantic Ocean Temp',
    tag: 'Atmospheric infrared sounder'
  },
  {
    id: 'sat-4',
    name: 'Landsat 9 Earth Obs',
    altitude: 705,
    velocity: 26900,
    latitude: -3.10,
    longitude: -60.02,
    status: 'STANDBY',
    pathColor: '#F43F5E',
    sensorTarget: 'Amazon Rainforest Canopy',
    tag: 'Hyperspectral land imager'
  }
];

export const TOP_EXPLORERS: Explorer[] = [
  {
    rank: 1,
    name: 'Leo Vane',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN8HODYiuXVgJo9AyMReuPS5ellPTFPWH7hSndRsK2XzZbH7SSyzH21Jyk8ne0DFf6Mrtt-iSIKCadOna28ipc9zsAkvB1T7Wq2QR2s_YlEn2mCQc7O8Kt8czevp8zAwn7kauX0IGZPt6QjKCeKhq-XYlfznLrNrq-cx-dEGZqw4tF_AW2slSPWA-u6WkjDGo0h9YYNFPE5el8iczULxjmQEVfRHZz6FIWsv8TxK3-JHiSOQcdhckU2wfPg6CUGKmUUSQsxZ77Cnza',
    discoveries: 2432
  },
  {
    rank: 2,
    name: 'Elena Voss',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJWBUCDNO1WMgKetHq-gupFeNmxkfbPrbb8fmT5uH_3GW9rAx4nHTMeRufj7ismbOgdrwkOd21PRN6AT1fQ49gm4ZL4OOyuuFCyQiWbg2FdMaTwZeHrVMaaqGKwlZH-SVomd392x66-UHE7ABSq2ICpUHXv6ZlT3GNR5M1AeJ_60jaO2XQXrhB6ouBcJNuFfHcrMc_Ay2ji4EgeXKqd9itwhx0nJ6yE2pZg70WpSfdE9QnmOAJR2YS7aoBuqKYwZTYlc5eMDsGsbZq',
    discoveries: 1941
  },
  {
    rank: 3,
    name: 'Marcus Kael',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpIg_-RkCNL174THwMbIM_-7skmsXWuGN7chaFkYw9Kzsf9CjeIq2h7MXAJgQdJdenTTA-Kgo41r22jdz8ZGfop34YbJj5TC7edpXRLlK9a23dP6ylNIfvjjd9Uc80Q1steDR5vgE2IIWYmXJqoUVVwzzqVor6xYh-oN6YYaguq9B1SgtPisSaEPhHmM1D46HZacln6q2ijt5bqNXJXtSphtGn4Q8nJ35ujh-4-_NzIFwHtCwagvY04ke21ZulXXIWifVNhsi1S2ah',
    discoveries: 1211
  },
  {
    rank: 4,
    name: 'Sarah Zhang',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQJ9udi7tN7IhW7GISU-MDodUI2zbxDRTRJkrZNJjW-f0YOtKR8jz1rgurEMbE6CY0L-mMcsBvXoGKJUBBuAwqo646rrAyY6bLgG20xgzlag5LcmczxMpzJcWjHy9wnVQ5mlG_M0vlJ19KPXw2JcCZFGK4ptakm4mcvP60OwfRI0vQ4SKr9uHYSg1pyvLFJpUZpH7Vlmk3-nOG755XVwVhUs3iJuilsxouY4QS9CucnMNUpH-WFvXbZokGHwZYVt-cAhgz28KIfEee',
    discoveries: 981
  }
];

export const ACTIVE_MISSIONS: ActiveMission[] = [
  {
    id: 'miss-1',
    name: 'Artemis VII Deployment',
    progress: 82,
    eta: 'T-Minus 42h',
    statusText: 'Optimal Orbital Path Alignment',
    color: '#00f2ff'
  },
  {
    id: 'miss-2',
    name: 'Mars Rover "Seeker"',
    progress: 45,
    eta: 'Surface Sol 124',
    statusText: 'Autonav driving active',
    color: '#adc6ff'
  },
  {
    id: 'miss-3',
    name: 'James Webb-2 Relay',
    progress: 99,
    eta: 'Finishing Calibration Pac',
    statusText: 'Deploying secondary mirror array',
    color: '#34d399'
  }
];

export const SPACE_DISCOVERIES: SpaceDiscovery[] = [
  {
    id: 'disc-1',
    date: 'MAY 24, 2026',
    title: 'Helium-3 Polar Matrix Mapped',
    description: 'Autonomous lunar rovers complete thermal and radiation mapping in the deep fissures of Shackleton Crater.',
    bgClass: 'bg-primary'
  },
  {
    id: 'disc-2',
    date: 'MAY 18, 2026',
    title: 'Atmospheric Carbon Levels Peak Sentinel Feed',
    description: 'Copernicus Sentinel-5 sensor registers severe thermal inversion over core manufacturing zones. Alerts dispatched to Earth regulatory hubs.',
    bgClass: 'bg-secondary'
  },
  {
    id: 'disc-3',
    date: 'MAY 04, 2026',
    title: 'Water Vapor Signatures on Kepler-186f Sibling',
    description: 'Deep infrared spectroscopic observation confirms substantial water vapor bands on rocky habitable zone exoplanet.',
    bgClass: 'bg-primary'
  }
];

export const EARTH_GALLERY: GalleryItem[] = [
  {
    id: 'gall-1',
    title: 'Amazon River Meanders',
    description: 'The spectacular meanders of the Amazon River captured looking straight down over the rainforest canopy. Demonstrates absolute density index verification for climate regulation analysis.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQM7lMcP8NS1fchTolfYReRvtOHFIBIjKknud2yzr8Ex-3OdoraEzhz4zqrNK8fyOGBa9UFLPtlSpA_qXR0X1-Sk1_2UTXYuusGhubvc0pOdBsGGd8PYjEkJD5RUDQpyIUk2GsaikdoJ0NEvFJzwG3ZYxoRyOnBJLjN4OjtQ2DZnojsqxzx8bIhyLVdVKe1jK2kOxLvjyE0hapEH6pfFBWUNKw2zxjZoW3P4JPMpLeYNj_XFOzGdpIIWxXMtxNAXc4RdOgdwZAuEYn',
    cameraInfo: 'Multispectral Spectrometer • Landsat-9',
    astronaut: 'Commander Shepard',
    date: 'May 20, 2026',
    sdgGoal: 'SDG 15: Life on Land'
  },
  {
    id: 'gall-2',
    title: 'Andes Southern Ice Field',
    description: 'Direct view of the melting glaciers over the Southern Andes. Highly relevant for ice runoff and water safety indicators under modern climate warming models.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3YnKC7D4GN4NNAvHcviMtzrqy9ZH88MLsexJsWhKu_MEmbID8cvhCnGycrLgsXAsiM4Veev5M_rzlqzim7OsA9BJE5MNr-pEvAm2hnxr0Icg8EqApaI3Bf7e3H9lPxhN9lu6wcoNmh7njME_Hz9FOnCHMMjUdz4Qol_JjM8kkkRxi52Hsa5kK0wxQk1ElLLvu02bfFpPnEdmfBkaEys0opKm1060GNkwNaBx3sV-SfGM9jxjx2Zb0Fr-aKk0YdCMjEWjccoDD3Sni',
    cameraInfo: 'Nikon Z9 modified • ISS Expedition 71',
    astronaut: 'Commander Miller',
    date: 'May 14, 2026',
    sdgGoal: 'SDG 13: Climate Action'
  }
];
