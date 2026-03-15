import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import type { NotificationDefaultSettings, ReporterNotificationSettings } from '@shared/types';

interface NotificationSettingsFormProps {
  value: Partial<NotificationDefaultSettings>;
  onChange: (value: Partial<NotificationDefaultSettings>) => void;
  globalSettings?: {
    notifications: NotificationDefaultSettings;
    reporterNotifications?: ReporterNotificationSettings;
  };
  disabled?: boolean;
  showCustomToggle?: boolean;
  useCustomSettings?: boolean;
  onCustomToggle?: (enabled: boolean) => void;
  reporterValue?: Partial<ReporterNotificationSettings>;
  onReporterChange?: (value: Partial<ReporterNotificationSettings>) => void;
}

export function NotificationSettingsForm({
  value,
  onChange,
  globalSettings,
  disabled = false,
  showCustomToggle = false,
  useCustomSettings = true,
  onCustomToggle,
  reporterValue,
  onReporterChange,
}: NotificationSettingsFormProps) {
  const effectiveEmailEnabled =
    value.emailEnabled ?? globalSettings?.notifications.emailEnabled ?? true;
  const effectiveNotifyOnNewReport =
    value.notifyOnNewReport ?? globalSettings?.notifications.notifyOnNewReport ?? true;
  const effectiveNotifyOnStatusChange =
    value.notifyOnStatusChange ?? globalSettings?.notifications.notifyOnStatusChange ?? true;
  const effectiveNotifyOnPriorityChange =
    value.notifyOnPriorityChange ?? globalSettings?.notifications.notifyOnPriorityChange ?? true;
  const effectiveNotifyOnAssignment =
    value.notifyOnAssignment ?? globalSettings?.notifications.notifyOnAssignment ?? true;
  const effectiveNotifyOnDeletion =
    value.notifyOnDeletion ?? globalSettings?.notifications.notifyOnDeletion ?? true;

  return (
    <div className="space-y-4">
      {/* Use Custom Notifications Toggle */}
      {showCustomToggle && (
        <div className="flex items-center justify-between pb-3 border-b">
          <div className="space-y-0.5">
            <Label htmlFor="use-custom-notifications" className="text-sm font-medium">
              Use Custom Notifications
            </Label>
            <p className="text-xs text-muted-foreground">
              Enable individual notification defaults for this project
            </p>
          </div>
          <Switch
            id="use-custom-notifications"
            checked={useCustomSettings}
            onCheckedChange={(checked) => {
              onCustomToggle?.(checked);
              if (!checked) {
                // Reset to undefined when switching to global defaults
                onChange({
                  emailEnabled: undefined,
                  notifyOnNewReport: undefined,
                  notifyOnStatusChange: undefined,
                  notifyOnPriorityChange: undefined,
                  notifyOnAssignment: undefined,
                  notifyOnDeletion: undefined,
                });
                onReporterChange?.({});
              }
            }}
          />
        </div>
      )}

      {/* Notification Settings - collapsed when custom toggle is off */}
      {(!showCustomToggle || useCustomSettings) && (
        <>
          {onReporterChange && (
            <p className="text-sm font-medium text-muted-foreground">Team Notifications</p>
          )}
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="default-email-enabled" className="text-sm font-normal">
                Email Notifications
              </Label>
              <p className="text-xs text-muted-foreground">Enable email notifications by default</p>
            </div>
            <Switch
              id="default-email-enabled"
              checked={effectiveEmailEnabled}
              onCheckedChange={(checked) => onChange({ ...value, emailEnabled: checked })}
              disabled={disabled}
            />
          </div>

          {effectiveEmailEnabled && (
            <>
              {/* New Reports */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-new-report" className="text-sm font-normal">
                    New Reports
                  </Label>
                  <p className="text-xs text-muted-foreground">Notify on new reports</p>
                </div>
                <Switch
                  id="default-new-report"
                  checked={effectiveNotifyOnNewReport}
                  onCheckedChange={(checked) => onChange({ ...value, notifyOnNewReport: checked })}
                  disabled={disabled}
                />
              </div>

              {/* Status Changes */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-status-change" className="text-sm font-normal">
                    Status Changes
                  </Label>
                  <p className="text-xs text-muted-foreground">Notify on status changes</p>
                </div>
                <Switch
                  id="default-status-change"
                  checked={effectiveNotifyOnStatusChange}
                  onCheckedChange={(checked) =>
                    onChange({ ...value, notifyOnStatusChange: checked })
                  }
                  disabled={disabled}
                />
              </div>

              {/* Priority Changes */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-priority-change" className="text-sm font-normal">
                    Priority Changes
                  </Label>
                  <p className="text-xs text-muted-foreground">Notify on priority changes</p>
                </div>
                <Switch
                  id="default-priority-change"
                  checked={effectiveNotifyOnPriorityChange}
                  onCheckedChange={(checked) =>
                    onChange({ ...value, notifyOnPriorityChange: checked })
                  }
                  disabled={disabled}
                />
              </div>

              {/* Assignments */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-assignment" className="text-sm font-normal">
                    Assignments
                  </Label>
                  <p className="text-xs text-muted-foreground">Notify on assignments</p>
                </div>
                <Switch
                  id="default-assignment"
                  checked={effectiveNotifyOnAssignment}
                  onCheckedChange={(checked) => onChange({ ...value, notifyOnAssignment: checked })}
                  disabled={disabled}
                />
              </div>

              {/* Deletions */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-deletion" className="text-sm font-normal">
                    Deletions
                  </Label>
                  <p className="text-xs text-muted-foreground">Notify when reports are deleted</p>
                </div>
                <Switch
                  id="default-deletion"
                  checked={effectiveNotifyOnDeletion}
                  onCheckedChange={(checked) => onChange({ ...value, notifyOnDeletion: checked })}
                  disabled={disabled}
                />
              </div>
            </>
          )}
        </>
      )}

      {/* Reporter Notifications */}
      {onReporterChange && (!showCustomToggle || useCustomSettings) && (
        <>
          <Separator className="my-4" />
          <p className="text-sm font-medium text-muted-foreground">Reporter Notifications</p>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reporter-status-change" className="text-sm font-normal">
                Status Change Notifications
              </Label>
              <p className="text-xs text-muted-foreground">
                Notify reporters on status changes
              </p>
            </div>
            <Switch
              id="reporter-status-change"
              checked={
                reporterValue?.notifyOnStatusChange ??
                globalSettings?.reporterNotifications?.notifyOnStatusChange ??
                true
              }
              onCheckedChange={(checked) =>
                onReporterChange({ ...reporterValue, notifyOnStatusChange: checked })
              }
              disabled={disabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reporter-priority-change" className="text-sm font-normal">
                Priority Change Notifications
              </Label>
              <p className="text-xs text-muted-foreground">
                Notify reporters on priority changes
              </p>
            </div>
            <Switch
              id="reporter-priority-change"
              checked={
                reporterValue?.notifyOnPriorityChange ??
                globalSettings?.reporterNotifications?.notifyOnPriorityChange ??
                true
              }
              onCheckedChange={(checked) =>
                onReporterChange({ ...reporterValue, notifyOnPriorityChange: checked })
              }
              disabled={disabled}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reporter-messaging" className="text-sm font-normal">
                Messaging System
              </Label>
              <p className="text-xs text-muted-foreground">
                Allow sending messages to reporters
              </p>
            </div>
            <Switch
              id="reporter-messaging"
              checked={
                reporterValue?.messagingEnabled ??
                globalSettings?.reporterNotifications?.messagingEnabled ??
                true
              }
              onCheckedChange={(checked) =>
                onReporterChange({ ...reporterValue, messagingEnabled: checked })
              }
              disabled={disabled}
            />
          </div>
        </>
      )}
    </div>
  );
}
