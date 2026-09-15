import {
  Home,
  MessageSquare,
  Bot,
  Tag,
  Users,
  Bookmark,
  Trophy,
  MessageCircle,
  FileText,
  Building2,
} from "lucide-react";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const Sidebar = ({ isOpen = true }: SidebarProps) => {
  if (!isOpen) return null;

  const menuItems = [
    { label: "Home", icon: Home },
    { label: "Questions", icon: MessageSquare },
    { label: "AI Assist", icon: Bot, badge: "Labs" },
    { label: "Tags", icon: Tag },
    { label: "Users", icon: Users },
    { label: "Saves", icon: Bookmark },
    { label: "Challenges", icon: Trophy, badge: "NEW" },
    { label: "Chat", icon: MessageCircle },
    { label: "Articles", icon: FileText },
    { label: "Companies", icon: Building2 },
  ];

  return (
    <aside className="w-full min-w-0 min-h-[calc(100vh-40px)] bg-white">
      <nav className="w-full pt-[22px]">

        {menuItems.map((item) => {
          const Icon = item.icon;

          const content = (
            <>
              <Icon
                size={19}
                strokeWidth={1.6}
                className="shrink-0 text-[#525960]"
              />

              <span className="ml-[14px] text-[15px] leading-none">
                {item.label}
              </span>

              {item.badge && (
                <span
                  className={`
                    ml-auto
                    text-[10px]
                    leading-none
                    px-[6px]
                    py-[4px]
                    rounded-[4px]
                    ${
                      item.badge === "NEW"
                        ? "bg-[#f9e5b8] text-[#8a5a00]"
                        : "bg-[#e1e4e6] text-[#6a737c]"
                    }
                  `}
                >
                  {item.badge}
                </span>
              )}
            </>
          );

          {/* USERS */}
          if (item.label === "Users") {
            return (
              <a
                key={item.label}
                href="/users"
                className="
                  w-full
                  h-[38px]
                  flex
                  items-center
                  px-[20px]
                  text-[#3b4045]
                  no-underline
                  hover:bg-[#f1f2f3]
                  cursor-pointer
                "
              >
                {content}
              </a>
            );
          }

          {/* OTHER ITEMS */}
          return (
            <div
              key={item.label}
              className="
                w-full
                h-[38px]
                flex
                items-center
                px-[20px]
                text-[#3b4045]
                hover:bg-[#f1f2f3]
                cursor-pointer
              "
            >
              {content}
            </div>
          );
        })}

      </nav>
    </aside>
  );
};

export default Sidebar;