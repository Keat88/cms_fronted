// assets/js/sidebar.js

const sidebarData = [
    {
        id: 1,
        title: "Dashboard",
        link: "dashboard.html",
        icon: "bi bi-grid"
    },
    {
        id: 2,
        title: "Contacts",
        link: "contact.html",
        icon: "bi bi-person-lines-fill"
    },
    {
        id: 3,
        title: "Favorites",
        link: "favorites.html",
        icon: "bi bi-star"
    },
    {
        id: 4,
        title: "Categories",
        link: "categories.html",
        icon: "bi bi-tags"
    },
    {
        id: 5,
        title: "Notes",
        link: "notes.html",
        icon: "bi bi-journal-text"
    }
];

const accountData = [
    {
        id: 1,
        title: "My Profile",
        link: "profile.html",
        icon: "bi bi-person"
    },
    {
        id: 2,
        title: "Settings",
        link: "setting.html",
        icon: "bi bi-sliders"
    }
];

export function renderSidebar() {
  const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
  let sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;
  const workspaceLinksHtml = sidebarData.map(item => {
      const isActive = currentPage === item.link;
      return `
        <li class="nav-item">
          <a href="${item.link}" class="nav-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
            <i class="${item.icon}"></i> ${item.title}
          </a>
        </li>
      `;
  }).join('');
  const accountLinksHtml = accountData.map(item => {
      const isActive = currentPage === item.link;
      return `
        <li class="nav-item">
          <a href="${item.link}" class="nav-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
            <i class="${item.icon}"></i> ${item.title}
          </a>
        </li>
      `;
  }).join('');

  sidebarContainer.innerHTML = `
    <aside class="sidebar offcanvas-lg offcanvas-start" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
      
      <!-- Offcanvas Header (Mobile Only) -->
      <div class="offcanvas-header d-lg-none border-bottom border-custom">
        <h5 class="offcanvas-title d-flex align-items-center gap-2 mb-0" id="sidebarMenuLabel">
          <span class="brand-logo"><i class="bi bi-app-indicator"></i></span>
          <span class="fw-bold">Connectly</span>
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
      </div>

      <!-- Offcanvas Body -->
      <div class="offcanvas-body p-3">

        <!-- Desktop Logo -->
        <a href="dashboard.html" class="brand d-none d-lg-flex align-items-center gap-2 mb-4 text-decoration-none">
          <span class="brand-logo"><i class="bi bi-app-indicator"></i></span>
          <span class="fs-5 fw-bold text-white">Connectly</span>
        </a>

        <!-- Workspace Selector -->
        <button type="button" class="workspace-selector mb-4">
          <span class="workspace-icon"><i class="bi bi-person-vcard"></i></span>
          <span class="workspace-text">
            <span class="workspace-title">Personal workspace</span>
            <span class="workspace-sub">Contacts &amp; connections</span>
          </span>
          <i class="bi bi-chevron-expand ms-auto text-muted-custom"></i>
        </button>

        <!-- Nav Links -->
        <p class="nav-heading">WORKSPACE</p>
        <ul class="nav nav-pills flex-column mb-4">
          ${workspaceLinksHtml}
        </ul>

        <p class="nav-heading">ACCOUNT</p>
        <ul class="nav nav-pills flex-column mb-auto">
          ${accountLinksHtml}
        </ul>

        <!-- Sidebar Footer -->
        <div class="sidebar-footer mt-auto pt-3 border-top border-custom footer-step">
          <div class="d-flex align-items-center gap-2 px-2 mb-3">
            <span class="status-dot"></span>
            <small class="text-muted-custom">All systems operational</small>
          </div>
          <div class="d-flex align-items-center justify-content-between gap-2">
            <div class="d-flex align-items-center gap-2">
              <div class="avatar avatar-md avatar-info">AM</div>
              <div class="lh-sm">
                <div class="fw-semibold text-white user-name">Alex Morgan</div>
                <div class="text-muted-custom user-role">Member</div>
              </div>
            </div>
            <a href="#" class="logout-btn" aria-label="Log out"><i class="bi bi-box-arrow-right"></i></a>
          </div>
        </div>

      </div>
    </aside>
  `;
}