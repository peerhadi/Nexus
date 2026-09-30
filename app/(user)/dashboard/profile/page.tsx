import ProfileHeader from "@/components/user/dashboard/profile/profile-header";
import ProfileHero from "@/components/user/dashboard/profile/profile-hero";
import SettingsList from "@/components/user/dashboard/profile/settings-list";
import AccountStatus from "@/components/user/dashboard/profile/account-status";

export default function ProfilePage() {
  return (
    <div className="space-y-7">
      <ProfileHeader />

      <ProfileHero />

      <SettingsList />

      <AccountStatus />
    </div>
  );
}
