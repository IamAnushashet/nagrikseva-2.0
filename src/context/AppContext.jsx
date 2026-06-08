import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { languageOptions, translations } from '../i18n/translations.js';

const AppContext = createContext(null);

const initialNotifications = [
  { id: 1, type: 'Application Updates', title: 'Income certificate moved to officer review', unread: true },
  { id: 2, type: 'Complaint Updates', title: 'Street light complaint assigned to Ward 11', unread: true },
  { id: 3, type: 'Deadline Reminders', title: 'Property mutation deadline is approaching', unread: true },
  { id: 4, type: 'DigiLocker Alerts', title: 'PAN verification requires review', unread: false },
];

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    simpleNavigation: false,
    voiceGuidance: false,
    colorBlind: false,
  });
  const [notifications, setNotifications] = useState(initialNotifications);
  const [mockUploads, setMockUploads] = useState([]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.classList.toggle('high-contrast', accessibility.highContrast);
    root.classList.toggle('large-text', accessibility.largeText);
    root.classList.toggle('simple-navigation', accessibility.simpleNavigation);
    root.classList.toggle('color-blind', accessibility.colorBlind);
  }, [accessibility, language]);

  const value = useMemo(() => {
    const activeLanguage = languageOptions.find((item) => item.code === language) || languageOptions[0];
    return {
      language,
      setLanguage,
      languageOptions,
      speechLanguage: activeLanguage.speech,
      t: (key) => translations[language]?.[key] || translations.en[key] || key,
      accessibility,
      setAccessibility,
      notifications,
      unreadCount: notifications.filter((notification) => notification.unread).length,
      markNotificationRead: (id) =>
        setNotifications((current) =>
          current.map((notification) => (notification.id === id ? { ...notification, unread: false } : notification)),
        ),
      markAllRead: () => setNotifications((current) => current.map((notification) => ({ ...notification, unread: false }))),
      mockUploads,
      addMockUpload: (file) => setMockUploads((current) => [file, ...current]),
    };
  }, [accessibility, language, mockUploads, notifications]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
