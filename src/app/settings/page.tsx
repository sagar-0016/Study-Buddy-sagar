
import type { Metadata } from 'next';
import SettingsPage from '@/components/settings/settings-page';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Settings() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your app experience.
        </p>
      </div>
      <SettingsPage />
    </div>
  );
}
