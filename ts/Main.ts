// TypeScript for interactive functionality

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    setupSmoothScrolling();
  
    // Setup project click handlers
    setupProjectClickHandlers();
  });
  
  /**
   * Sets up smooth scrolling for navigation links
   */
  function setupSmoothScrolling(): void {
    const navLinks = document.querySelectorAll("nav a");
  
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
  
        const targetId = link.getAttribute("href")?.substring(1);
        if (!targetId) return;
  
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
  
        // Calculate offset to account for fixed header
        const headerHeight = 100; // Height of the fixed header
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
  
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      });
    });
  }
  
  /**
   * Sets up click handlers for project sections
   */
  function setupProjectClickHandlers(): void {
    // UX/UI Projects
    const uxuiProjects = document.querySelectorAll("#uxui .flex-wrap > article");
    setupProjectExpand(
      uxuiProjects,
      "The Stranger",
      "Mentes en Acción",
      "LogiCubes",
    );
  
    // Identity Projects
    const identityProjects = document.querySelectorAll(
      "#identidad .overflow-hidden > article",
    );
    setupProjectExpand(
      identityProjects,
      "Pulido: Diseña",
      "Exagon",
      "Ari Bakery",
    );
  }
  
  /**
   * Sets up click handlers for expanding project details
   * @param projects - NodeList of project elements
   * @param sectionIds - Array of section IDs to scroll to
   */
  function setupProjectExpand(
    projects: NodeListOf<Element>,
    ...sectionIds: string[]
  ): void {
    projects.forEach((project, index) => {
      if (index < sectionIds.length) {
        project.addEventListener("click", () => {
          // Find the corresponding detailed section
          const sectionTitle = sectionIds[index];
          const sections = document.querySelectorAll("h2");
  
          let targetSection: Element | null = null;
          sections.forEach((section) => {
            if (section.textContent?.trim() === sectionTitle) {
              targetSection = section;
            }
          });
  
          if (targetSection) {
            // Calculate offset to account for fixed header
            const headerHeight = 100; // Height of the fixed header
            const targetPosition =
              targetSection.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;
  
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        });
  
        // Add cursor pointer to indicate clickable
        project.classList.add("cursor-pointer");
      }
    });
  }
  
  // Self-executing function to avoid polluting the global namespace
  (function () {
    // Export functions if needed for external use
    window.portfolioApp = {
      scrollToSection: (sectionId: string): void => {
        const targetElement = document.getElementById(sectionId);
        if (!targetElement) return;
  
        const headerHeight = 100;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;
  
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      },
    };
  })();
  
  // Add TypeScript interface for the global window object
  interface Window {
    portfolioApp: {
      scrollToSection: (sectionId: string) => void;
    };
  }
  