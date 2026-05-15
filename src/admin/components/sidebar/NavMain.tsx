import { Link, useLocation } from 'react-router-dom';
import {
  type LucideIcon,
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Bug,
  AppWindow,
  Camera,
  Languages,
  Settings as SettingsIcon,
  Bell,
  UsersRound,
  Shield,
  Palette,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '../ui/sidebar';

interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
  roles?: Array<'admin' | 'editor' | 'viewer'>;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: ClipboardList,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: FolderKanban,
    roles: ['admin'],
  },
];

const widgetItems: NavItem[] = [
  { title: 'Button', url: '/button', icon: Bug },
  { title: 'Dialog', url: '/dialog', icon: AppWindow },
  { title: 'Screenshot', url: '/screenshot', icon: Camera },
  { title: 'Language', url: '/language', icon: Languages },
];

const consoleItems: NavItem[] = [
  { title: 'Settings', url: '/settings', icon: SettingsIcon },
  { title: 'Notifications', url: '/notifications', icon: Bell },
  { title: 'Users', url: '/users', icon: UsersRound },
  { title: 'Security', url: '/security', icon: Shield },
  { title: 'Branding', url: '/branding', icon: Palette },
  { title: 'License', url: '/license', icon: KeyRound },
];

interface NavGroupProps {
  label: string;
  items: NavItem[];
  location: ReturnType<typeof useLocation>;
  onItemClick: () => void;
}

function NavGroup({ label, items, location, onItemClick }: NavGroupProps) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive =
            item.url === '/' ? location.pathname === '/' : location.pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                <Link to={item.url} onClick={onItemClick}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function NavMain() {
  const { user } = useAuth();
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeSidebarOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    if (!user) return false;
    return item.roles.includes(user.role);
  });

  const showAdminGroups = !!user && user.role === 'admin';

  return (
    <>
      <NavGroup
        label="Workspace"
        items={filteredNavItems}
        location={location}
        onItemClick={closeSidebarOnMobile}
      />

      {showAdminGroups && (
        <>
          <NavGroup
            label="Widget"
            items={widgetItems}
            location={location}
            onItemClick={closeSidebarOnMobile}
          />
          <NavGroup
            label="Console"
            items={consoleItems}
            location={location}
            onItemClick={closeSidebarOnMobile}
          />
        </>
      )}
    </>
  );
}
