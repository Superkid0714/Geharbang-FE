import { ExpoConfig } from "@expo/config";
import "dotenv/config";

const sentryOrg = process.env.SENTRY_ORG;
const sentryProject = process.env.SENTRY_PROJECT;
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;

const plugins: ExpoConfig["plugins"] = [
  "expo-router",
  [
    "expo-splash-screen",
    {
      backgroundColor: "#FFFFFF",
      image: "./assets/icon.png",
      imageWidth: 156,
      resizeMode: "contain",
      dark: {
        backgroundColor: "#FFFFFF",
        image: "./assets/icon.png",
      },
    },
  ],
  "./plugins/withNaverMapRepository",
  "expo-web-browser",
  "expo-notifications",
  [
    "expo-image-picker",
    {
      photosPermission: "AI 챗봇에 사진을 첨부하려면 사진 접근 권한이 필요합니다.",
    },
  ],
  [
    "expo-secure-store",
    {
      configureAndroidBackup: true,
      faceIDPermission:
        "Allow $(PRODUCT_NAME) to access your Face ID biometric data.",
    },
  ],
  [
    "@mj-studio/react-native-naver-map",
    {
      client_id: process.env.NAVER_MAP_CLIENT_ID,
    },
  ],
];

if (sentryOrg && sentryProject && sentryAuthToken) {
  plugins.splice(1, 0, [
    "@sentry/react-native/expo",
    {
      organization: sentryOrg,
      project: sentryProject,
    },
  ]);
}

const config: ExpoConfig = {
  name: "게하르방",
  slug: "Geharbang-FE",
  version: "1.2.4",
  orientation: "portrait",
  icon: "./assets/icon.png",
  scheme: "geharbang",
  platforms: ["ios", "android", "web"],
  userInterfaceStyle: "automatic",
  newArchEnabled: true,

  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.econovation.geharbang",
    buildNumber: "12",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,

      CFBundleURLTypes: [
        {
          CFBundleURLSchemes: ["geharbang"],
        },
      ],
    },
  },

  android: {
    versionCode: 13,
    softwareKeyboardLayoutMode: "resize",
    // SDK 54 타입은 Android 16 기준으로 true만 노출하지만,
    // Android 15 이하에서는 adjustResize가 동작하도록 opt-out이 필요하다.
    edgeToEdgeEnabled: false as true,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#33A8F8",
    },

    predictiveBackGestureEnabled: false,
    package: "com.econovation.geharbang",
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "geharbang",
            host: "oauth-callback",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },

  web: {
    bundler: "metro",
    output: "static",
  },

  plugins,

  experiments: {
    typedRoutes: true,
  },

  extra: {
    router: {},
    eas: {
      projectId: "81bf359a-a232-4d2e-bf98-50c02b62485d",
    },
    naverMapClientId: process.env.NAVER_MAP_CLIENT_ID,
  },
};

export default config;
