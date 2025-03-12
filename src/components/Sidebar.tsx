
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ListFilter, Settings, Home, Package2, TruckIcon, Bell, CreditCard } from 'lucide-react';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  count?: number;
  active?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, count, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
        active ? "bg-accent text-primary font-medium" : "text-foreground/70 hover:bg-accent/50"
      )}
    >
      <Icon size={18} className={active ? "text-primary" : "text-foreground/70"} />
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-auto bg-foreground/10 px-2 py-0.5 rounded-full text-xs">
          {count}
        </span>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  
  const categories = [
    {
      title: "Resell",
      items: [
        {
          icon: ListFilter,
          label: "Manage Listing",
          href: "/manage-listings",
          count: 15,
        },
        {
          icon: Settings,
          label: "Customise",
          href: "/customise",
        },
        {
          icon: Settings,
          label: "General Settings",
          href: "/settings",
        },
        {
          icon: Package2,
          label: "Image Upload",
          href: "/image-upload",
        },
        {
          icon: TruckIcon,
          label: "Shipping Methods",
          href: "/shipping",
        },
        {
          icon: Bell,
          label: "Notifications",
          href: "/notifications",
        },
        {
          icon: CreditCard,
          label: "Billing",
          href: "/billing",
        },
      ],
    },
  ];

  return (
    <aside className="w-56 h-screen border-r border-border bg-white py-6 px-2 flex flex-col">
      <div className="px-3 mb-6 flex items-center">
        <div className="relative h-8 w-8 mr-2">
          <div className="absolute inset-0 bg-postco rounded-md flex items-center justify-center">
            <span className="text-black font-semibold">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0C3.6 0 0 3.6 0 8C0 13.4 7 20 8 20C9 20 16 13.4 16 8C16 3.6 12.4 0 8 0ZM8 11C6.3 11 5 9.7 5 8C5 6.3 6.3 5 8 5C9.7 5 11 6.3 11 8C11 9.7 9.7 11 8 11Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </div>
        <span className="text-lg font-semibold text-foreground">PostCo</span>
      </div>

      <div className="space-y-6 flex-1 overflow-auto">
        {categories.map((category) => (
          <div key={category.title} className="space-y-1">
            <h3 className="text-xs font-medium text-foreground/50 px-3 mb-2">{category.title}</h3>
            {category.items.map((item) => (
              <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                count={item.count}
                active={location.pathname === item.href}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 px-3">
        <div className="flex items-center gap-2 p-2 bg-muted rounded-md">
          <div className="h-8 w-8 rounded-full bg-postco flex items-center justify-center text-postco-foreground">
            LG
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">demo-shop.myshopify.com</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-status-listed"></span>
              <p className="text-xs text-foreground/70">Active</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
