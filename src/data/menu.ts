export const demos = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1,
  href: `/demo${i + 1}`,
  srcSet: `/assets/img/demos/mi${i + 1}@2x.jpg 2x`,
  src: `/assets/img/demos/mi${i + 1}.jpg`,
  alt: `Demo ${i + 1}`,
}));

export const otherPages = [
  {
    id: "services",
    label: "Services",
    links: [
      { id: "services1", href: "/services", label: "Services I" },
      { id: "services2", href: "/services2", label: "Services II" },
    ],
  },
  {
    id: "about",
    label: "About",
    links: [
      { id: "about1", href: "/about", label: "About I" },
      { id: "about2", href: "/about2", label: "About II" },
    ],
  },
  {
    id: "shop",
    label: "Shop",
    links: [
      { id: "shop1", href: "/shop", label: "Shop I" },
      { id: "shop2", href: "/shop2", label: "Shop II" },
      { id: "shop-product", href: "/shop-product/1", label: "Product Page" },
      { id: "shop-cart", href: "/shop-cart", label: "Shopping Cart" },
      { id: "shop-checkout", href: "/shop-checkout", label: "Checkout" },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    links: [
      { id: "contact1", href: "/contact", label: "Contact I" },
      { id: "contact2", href: "/contact2", label: "Contact II" },
      { id: "contact3", href: "/contact3", label: "Contact III" },
    ],
  },
  {
    id: "career",
    label: "Career",
    links: [
      { id: "career1", href: "/career", label: "Job Listing I" },
      { id: "career2", href: "/career2", label: "Job Listing II" },
      { id: "career-job", href: "/career-job", label: "Job Description" },
    ],
  },
  {
    id: "utility",
    label: "Utility",
    links: [
      { id: "404", href: "/404-page", label: "404 Not Found" },
      { id: "page-loader", href: "/page-loader", label: "Page Loader" },
      { id: "signin1", href: "/signin", label: "Sign In I" },
      { id: "signin2", href: "/signin2", label: "Sign In II" },
      { id: "signup1", href: "/signup", label: "Sign Up I" },
      { id: "signup2", href: "/signup2", label: "Sign Up II" },
      { id: "terms", href: "/terms", label: "Terms" },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    href: "/pricing",
  },
  {
    id: "onepage",
    label: "One Page",
    href: "/onepage",
  },
];

export const projectPages = [
  {
    id: "project-pages",
    title: "Project Pages",
    links: [
      { id: "projects1", href: "/projects", label: "Projects I" },
      { id: "projects2", href: "/projects2", label: "Projects II" },
      { id: "projects3", href: "/projects3", label: "Projects III" },
      { id: "projects4", href: "/projects4", label: "Projects IV" },
    ],
  },
  {
    id: "single-projects",
    title: "Single Projects",
    links: [
      {
        id: "single-project1",
        href: "/single-project",
        label: "Single Project I",
      },
      {
        id: "single-project2",
        href: "/single-project2",
        label: "Single Project II",
      },
      {
        id: "single-project3",
        href: "/single-project3",
        label: "Single Project III",
      },
      {
        id: "single-project4",
        href: "/single-project4",
        label: "Single Project IV",
      },
    ],
  },
];

export const blogItems = [
  {
    id: "blog1",
    href: "/blog",
    label: "Blog without Sidebar",
    type: "link", // Indicates this is a standalone link
  },
  {
    id: "blog2",
    href: "/blog2",
    label: "Blog with Sidebar",
    type: "link", // Indicates this is a standalone link
  },
  {
    id: "blog3",
    href: "/blog3",
    label: "Blog with Left Sidebar",
    type: "link", // Indicates this is a standalone link
  },
  {
    id: "blog-posts",
    label: "Blog Posts",
    type: "dropdown", // Indicates this is a dropdown menu
    links: [
      {
        id: "blog-post1",
        href: "/blog-post",
        label: "Post without Sidebar",
      },
      {
        id: "blog-post2",
        href: "/blog-post2",
        label: "Post with Sidebar",
      },
      {
        id: "blog-post3",
        href: "/blog-post3",
        label: "Post with Left Sidebar",
      },
    ],
  },
];

export const blockItems = [
  {
    id: "about",
    href: "/docs/blocks/about",
    image: "/assets/img/demos/block1.svg",
    label: "About",
  },
  {
    id: "blog",
    href: "/docs/blocks/blog",
    image: "/assets/img/demos/block2.svg",
    label: "Blog",
  },
  {
    id: "call-to-action",
    href: "/docs/blocks/call-to-action",
    image: "/assets/img/demos/block3.svg",
    label: "Call to Action",
  },
  {
    id: "clients",
    href: "/docs/blocks/clients",
    image: "/assets/img/demos/block4.svg",
    label: "Clients",
  },
  {
    id: "contact",
    href: "/docs/blocks/contact",
    image: "/assets/img/demos/block5.svg",
    label: "Contact",
  },
  {
    id: "facts",
    href: "/docs/blocks/facts",
    image: "/assets/img/demos/block6.svg",
    label: "Facts",
  },
  {
    id: "faq",
    href: "/docs/blocks/faq",
    image: "/assets/img/demos/block7.svg",
    label: "FAQ",
  },
  {
    id: "features",
    href: "/docs/blocks/features",
    image: "/assets/img/demos/block8.svg",
    label: "Features",
  },
  {
    id: "footer",
    href: "/docs/blocks/footer",
    image: "/assets/img/demos/block9.svg",
    label: "Footer",
  },
  {
    id: "hero",
    href: "/docs/blocks/hero",
    image: "/assets/img/demos/block10.svg",
    label: "Hero",
  },
  {
    id: "misc",
    href: "/docs/blocks/misc",
    image: "/assets/img/demos/block17.svg",
    label: "Misc",
  },
  {
    id: "navbar",
    href: "/docs/blocks/navbar",
    image: "/assets/img/demos/block11.svg",
    label: "Navbar",
  },
  {
    id: "portfolio",
    href: "/docs/blocks/portfolio",
    image: "/assets/img/demos/block12.svg",
    label: "Portfolio",
  },
  {
    id: "pricing",
    href: "/docs/blocks/pricing",
    image: "/assets/img/demos/block13.svg",
    label: "Pricing",
  },
  {
    id: "process",
    href: "/docs/blocks/process",
    image: "/assets/img/demos/block14.svg",
    label: "Process",
  },
  {
    id: "team",
    href: "/docs/blocks/team",
    image: "/assets/img/demos/block15.svg",
    label: "Team",
  },
  {
    id: "testimonials",
    href: "/docs/blocks/testimonials",
    image: "/assets/img/demos/block16.svg",
    label: "Testimonials",
  },
];

export const docsPages = [
  {
    id: "usage",
    title: "Usage",
    columns: 2,
    links: [
      { id: "get-started", href: "/docs/intro", label: "Get Started" },

      { id: "faq", href: "/docs/faq", label: "FAQ" },
      { id: "changelog", href: "/docs/changelog", label: "Changelog" },
      { id: "credits", href: "/docs/credits", label: "Credits" },
    ],
  },
  {
    id: "styleguide",
    title: "Styleguide",
    columns: 2,
    links: [
      { id: "colors", href: "/docs/styleguide/colors", label: "Colors" },
      { id: "fonts", href: "/docs/styleguide/fonts", label: "Fonts" },
      {
        id: "icons-svg",
        href: "/docs/styleguide/icons-svg",
        label: "SVG Icons",
      },
      {
        id: "icons-font",
        href: "/docs/styleguide/icons-font",
        label: "Font Icons",
      },
      {
        id: "illustrations",
        href: "/docs/styleguide/illustrations",
        label: "Illustrations",
      },
      {
        id: "backgrounds",
        href: "/docs/styleguide/backgrounds",
        label: "Backgrounds",
      },
      { id: "misc", href: "/docs/styleguide/misc", label: "Misc" },
    ],
  },
  {
    id: "elements",
    title: "Elements",
    columns: 3,
    links: [
      { id: "accordion", href: "/docs/elements/accordion", label: "Accordion" },
      { id: "alerts", href: "/docs/elements/alerts", label: "Alerts" },
      {
        id: "animations",
        href: "/docs/elements/animations",
        label: "Animations",
      },
      { id: "avatars", href: "/docs/elements/avatars", label: "Avatars" },
      {
        id: "background",
        href: "/docs/elements/background",
        label: "Background",
      },
      { id: "badges", href: "/docs/elements/badges", label: "Badges" },
      { id: "buttons", href: "/docs/elements/buttons", label: "Buttons" },
      { id: "card", href: "/docs/elements/card", label: "Card" },
      { id: "carousel", href: "/docs/elements/carousel", label: "Carousel" },
      { id: "dividers", href: "/docs/elements/dividers", label: "Dividers" },
      {
        id: "form-elements",
        href: "/docs/elements/form-elements",
        label: "Form Elements",
      },
      {
        id: "image-hover",
        href: "/docs/elements/image-hover",
        label: "Image Hover",
      },
      {
        id: "image-mask",
        href: "/docs/elements/image-mask",
        label: "Image Mask",
      },
      { id: "lightbox", href: "/docs/elements/lightbox", label: "Lightbox" },
      { id: "player", href: "/docs/elements/player", label: "Media Player" },
      { id: "modal", href: "/docs/elements/modal", label: "Modal" },
      {
        id: "pagination",
        href: "/docs/elements/pagination",
        label: "Pagination",
      },
      {
        id: "progressbar",
        href: "/docs/elements/progressbar",
        label: "Progressbar",
      },
      { id: "shadows", href: "/docs/elements/shadows", label: "Shadows" },
      { id: "shapes", href: "/docs/elements/shapes", label: "Shapes" },
      { id: "tables", href: "/docs/elements/tables", label: "Tables" },
      { id: "tabs", href: "/docs/elements/tabs", label: "Tabs" },
      {
        id: "text-animations",
        href: "/docs/elements/text-animations",
        label: "Text Animations",
      },
      {
        id: "text-highlight",
        href: "/docs/elements/text-highlight",
        label: "Text Highlight",
      },
      { id: "tiles", href: "/docs/elements/tiles", label: "Tiles" },
      {
        id: "tooltips-popovers",
        href: "/docs/elements/tooltips-popovers",
        label: "Tooltips & Popovers",
      },
      {
        id: "typography",
        href: "/docs/elements/typography",
        label: "Typography",
      },
    ],
  },
];
