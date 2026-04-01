type StructuredDataProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

type CollectionItem = {
  name: string;
  url: string;
  description?: string;
};

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function buildBreadcrumbData(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

type CollectionPageInput = {
  name: string;
  url: string;
  description: string;
  items: CollectionItem[];
};

export function buildCollectionPageData({
  name,
  url,
  description,
  items,
}: CollectionPageInput) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name,
      url,
      description,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.url,
        name: item.name,
        description: item.description,
      })),
    },
  ];
}
