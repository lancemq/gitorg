import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {items.map((item, index) => (
          <li className="breadcrumbs-item" key={`${item.label}-${index}`}>
            {item.href ? (
              <Link className="breadcrumb-link" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <strong className="breadcrumb-current">{item.label}</strong>
            )}
            {index < items.length - 1 ? (
              <span className="breadcrumb-separator" aria-hidden="true">
                ↗
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
