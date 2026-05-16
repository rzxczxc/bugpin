import { NotificationDefaults } from './NotificationDefaults';
import { ReporterNotifications } from './ReporterNotifications';
import { EmailTemplates } from './EmailTemplates';
import { SubPageTabs } from './SubPageTabs';

const NOTIFICATIONS_SUB_TABS = [
  { hash: 'general', label: 'General' },
  { hash: 'reporter', label: 'Reporter' },
  { hash: 'email-templates', label: 'Email Templates' },
];

export function NotificationsPage() {
  return (
    <div className="max-w-4xl">
      <SubPageTabs subTabs={NOTIFICATIONS_SUB_TABS} defaultHash="general">
        <NotificationDefaults />
        <ReporterNotifications />
        <EmailTemplates />
      </SubPageTabs>
    </div>
  );
}
