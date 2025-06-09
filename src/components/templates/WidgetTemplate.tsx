import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface WidgetTemplateProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  footer?: ReactNode;
}

export const WidgetTemplate: React.FC<WidgetTemplateProps> = ({
  title,
  children,
  actions,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
  footer,
}) => {
  return (
    <div
      className={cn(
        "bg-base-200 rounded-lg shadow-sm border border-base-300",
        className
      )}
    >
      <div
        className={cn(
          "px-4 py-3 border-b border-base-300 flex items-center justify-between",
          headerClassName
        )}
      >
        <h3 className="text-lg font-medium text-base-900">{title}</h3>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className={cn("p-4", contentClassName)}>{children}</div>
      {footer && (
        <div
          className={cn("px-4 py-3 border-t border-base-300", footerClassName)}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
