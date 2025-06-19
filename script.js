// ==========================================
// 澳門工人體育場網站 JavaScript 主文件
// Macau Workers' Stadium Website Main JavaScript File
// ==========================================

// 全局變量定義 - Global variables definition
let currentLanguage = "zh" // 當前語言 - Current language
let currentPage = "home" // 當前頁面 - Current page
let isMenuOpen = false // 移動端菜單狀態 - Mobile menu state
let AOS // Declare AOS variable

// DOM 載入完成後初始化 - Initialize after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
})

// ==========================================
// 網站初始化函數 - Website initialization function
// ==========================================
function initializeWebsite() {
  console.log("🚀 澳門工人體育場網站初始化中... / Initializing Macau Stadium Website...")

  // 初始化各個功能模塊 - Initialize functional modules
  initializeLoading()
  initializeNavigation()
  initializeLanguage()
  initializeParticles()
  initializeScrollEffects()
  initializeAnimations()
  initializeLazyLoading()
  preloadCriticalResources()

  console.log("✅ 網站初始化完成！ / Website initialization completed!")
}

// ==========================================
// 載入畫面控制 - Loading screen control
// ==========================================
function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen")

  if (!loadingScreen) {
    console.warn("Loading screen element not found")
    return
  }

  // 模擬載入時間 - Simulate loading time
  setTimeout(() => {
    loadingScreen.classList.add("hidden")

    // 載入完成後移除元素 - Remove element after loading
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.parentNode.removeChild(loadingScreen)
      }
    }, 500)
  }, 2000)
}

// ==========================================
// 導航功能初始化 - Navigation functionality initialization
// ==========================================
function initializeNavigation() {
  const navItems = document.querySelectorAll(".nav-item")
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  // 桌面導航點擊事件 - Desktop navigation click events
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      const targetPage = this.getAttribute("data-page")
      if (targetPage) {
        switchPage(targetPage)
        updateActiveNavItem(this)

        // 如果是移動端，關閉菜單 - Close menu if mobile
        if (isMenuOpen) {
          toggleMobileMenu()
        }
      }
    })
  })

  // 移動端菜單切換 - Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  // 點擊外部關閉移動端菜單 - Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isMenuOpen &&
      mobileMenu &&
      mobileMenuToggle &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      toggleMobileMenu()
    }
  })

  // Hero按鈕導航 - Hero button navigation
  const heroButtons = document.querySelectorAll(".hero-buttons .btn")
  heroButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetPage = this.getAttribute("data-page")
      if (targetPage) {
        switchPage(targetPage)
        const navItem = document.querySelector(`[data-page="${targetPage}"]`)
        if (navItem) {
          updateActiveNavItem(navItem)
        }
      }
    })
  })
}

// 頁面切換函數 - Page switching function
function switchPage(pageName) {
  const pages = document.querySelectorAll(".page")
  const targetPage = document.getElementById(`${pageName}-page`)

  if (!targetPage) {
    console.error(`頁面不存在: ${pageName}`)
    return
  }

  // 隱藏所有頁面 - Hide all pages
  pages.forEach((page) => {
    page.classList.remove("active")
  })

  // 顯示目標頁面 - Show target page
  setTimeout(() => {
    targetPage.classList.add("active")
    currentPage = pageName

    // 滾動到頂部 - Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })

    // 重新初始化動畫 - Reinitialize animations
    if (typeof AOS !== "undefined" && AOS.refresh) {
      AOS.refresh()
    } else {
      // 如果AOS不可用，重新初始化基礎動畫
      setTimeout(() => {
        initializeBasicScrollAnimations()
      }, 100)
    }
  }, 100)

  console.log(`📄 切換到頁面: ${pageName} / Switched to page: ${pageName}`)
}

// 更新活動導航項 - Update active navigation item
function updateActiveNavItem(activeItem) {
  const allNavItems = document.querySelectorAll(".nav-item")

  allNavItems.forEach((item) => {
    item.classList.remove("active")
  })

  // 更新桌面和移動端對應的導航項 - Update both desktop and mobile nav items
  const targetPage = activeItem.getAttribute("data-page")
  const correspondingItems = document.querySelectorAll(`[data-page="${targetPage}"]`)

  correspondingItems.forEach((item) => {
    item.classList.add("active")
  })
}

// 移動端菜單切換 - Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  const toggleIcon = document.querySelector(".mobile-menu-toggle i")

  if (!mobileMenu || !toggleIcon) {
    console.warn("Mobile menu elements not found")
    return
  }

  isMenuOpen = !isMenuOpen

  if (isMenuOpen) {
    mobileMenu.classList.add("active")
    toggleIcon.className = "fas fa-times"
    document.body.style.overflow = "hidden" // 防止背景滾動
  } else {
    mobileMenu.classList.remove("active")
    toggleIcon.className = "fas fa-bars"
    document.body.style.overflow = ""
  }
}

// ==========================================
// 語言切換功能 - Language switching functionality
// ==========================================
function initializeLanguage() {
  const langToggle = document.getElementById("lang-toggle")

  if (!langToggle) {
    console.warn("Language toggle button not found")
    return
  }

  // 從本地存儲載入語言設置 - Load language setting from localStorage
  try {
    const savedLanguage = localStorage.getItem("stadium-language")
    if (savedLanguage) {
      currentLanguage = savedLanguage
      updateLanguageDisplay()
    }
  } catch (e) {
    console.warn("Cannot access localStorage:", e)
  }

  // 語言切換按鈕事件 - Language toggle button event
  langToggle.addEventListener("click", () => {
    currentLanguage = currentLanguage === "zh" ? "pt" : "zh"
    updateLanguageDisplay()
    saveLanguagePreference()

    console.log(`🌐 語言切換至: ${currentLanguage} / Language switched to: ${currentLanguage}`)
  })
}

// 更新語言顯示 - Update language display
function updateLanguageDisplay() {
  const langText = document.getElementById("lang-text")
  const elementsWithLangData = document.querySelectorAll("[data-zh], [data-pt]")

  // 更新語言按鈕文字 - Update language button text
  if (langText) {
    langText.textContent = currentLanguage === "zh" ? "中" : "PT"
  }

  // 更新所有具有語言數據的元素 - Update all elements with language data
  elementsWithLangData.forEach((element) => {
    const text = element.getAttribute(`data-${currentLanguage}`)
    if (text) {
      element.textContent = text
    }
  })

  // 更新HTML語言屬性 - Update HTML language attribute
  document.documentElement.lang = currentLanguage === "zh" ? "zh-TW" : "pt"
}

// 保存語言偏好 - Save language preference
function saveLanguagePreference() {
  try {
    localStorage.setItem("stadium-language", currentLanguage)
  } catch (e) {
    console.warn("Cannot save to localStorage:", e)
  }
}

// ==========================================
// 背景粒子動畫 - Background particles animation
// ==========================================
function initializeParticles() {
  const particlesContainer = document.getElementById("particles-container")

  if (!particlesContainer) {
    console.warn("Particles container not found")
    return
  }

  const particleCount = 20

  // 創建粒子 - Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer)
  }

  // 定期添加新粒子 - Periodically add new particles
  setInterval(() => {
    if (particlesContainer.children.length < particleCount) {
      createParticle(particlesContainer)
    }
  }, 2000)
}

// 創建單個粒子 - Create single particle
function createParticle(container) {
  const particle = document.createElement("div")
  particle.className = "particle"

  // 隨機位置和大小 - Random position and size
  const size = Math.random() * 4 + 2
  const startX = Math.random() * window.innerWidth
  const duration = Math.random() * 10 + 10

  particle.style.width = size + "px"
  particle.style.height = size + "px"
  particle.style.left = startX + "px"
  particle.style.animationDuration = duration + "s"

  container.appendChild(particle)

  // 動畫結束後移除粒子 - Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle)
    }
  }, duration * 1000)
}

// ==========================================
// 滾動效果初始化 - Scroll effects initialization
// ==========================================
function initializeScrollEffects() {
  const navbar = document.getElementById("navbar")
  const backToTopBtn = document.getElementById("back-to-top")
  let lastScrollTop = 0

  // 滾動事件監聽 - Scroll event listener
  window.addEventListener(
    "scroll",
    throttle(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // 導航欄滾動效果 - Navbar scroll effect
      if (navbar) {
        if (scrollTop > 100) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      }

      // 返回頂部按鈕顯示/隱藏 - Back to top button show/hide
      if (backToTopBtn) {
        if (scrollTop > 300) {
          backToTopBtn.classList.add("visible")
        } else {
          backToTopBtn.classList.remove("visible")
        }
      }

      lastScrollTop = scrollTop
    }, 100),
  )

  // 返回頂部按鈕點擊事件 - Back to top button click event
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // 平滑滾動到錨點 - Smooth scroll to anchors
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// ==========================================
// 動畫效果初始化 - Animation effects initialization
// ==========================================
function initializeAnimations() {
  // 檢查瀏覽器支持 - Check browser support
  if (!window.IntersectionObserver) {
    console.warn("IntersectionObserver not supported")
    return
  }

  // 數字計數動畫 - Number counting animation
  const statNumbers = document.querySelectorAll(".stat-number")
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }

  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumber(entry.target)
        numberObserver.unobserve(entry.target)
      }
    })
  }, observerOptions)

  statNumbers.forEach((number) => {
    numberObserver.observe(number)
  })

  // 卡片懸停效果 - Card hover effects
  initializeCardEffects()

  // 打字機效果 - Typewriter effect
  initializeTypewriterEffect()

  // 檢查AOS是否可用 - Check if AOS is available
  if (typeof AOS !== "undefined" && AOS.refresh) {
    console.log("🎬 AOS動畫已啟用 / AOS animations enabled")
  } else {
    console.log("📱 使用基礎動畫效果 / Using basic animation effects")
    // 如果AOS不可用，添加基礎的滾動動畫
    initializeBasicScrollAnimations()
  }
}

// 添加基礎滾動動畫函數
function initializeBasicScrollAnimations() {
  const animatedElements = document.querySelectorAll("[data-aos]")

  if (animatedElements.length === 0) return

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          entry.target.style.transition = "opacity 0.8s ease, transform 0.8s ease"
          scrollObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(30px)"
    scrollObserver.observe(element)
  })
}

// 數字動畫函數 - Number animation function
function animateNumber(element) {
  const originalText = element.textContent
  const hasPlus = originalText.includes("+")
  const finalNumber = Number.parseInt(originalText.replace(/[^\d,]/g, "").replace(/,/g, "")) || 0
  const duration = 2000
  const increment = finalNumber / (duration / 16)
  let current = 0

  const timer = setInterval(() => {
    current += increment
    if (current >= finalNumber) {
      current = finalNumber
      clearInterval(timer)
    }

    // 格式化數字，保持原有格式（包括+符號）- Format number maintaining original format (including + symbol)
    const formattedNumber = Math.floor(current).toLocaleString()
    element.textContent = hasPlus ? formattedNumber + "+" : formattedNumber
  }, 16)
}

// 卡片效果初始化 - Card effects initialization
function initializeCardEffects() {
  const cards = document.querySelectorAll(".stat-card, .highlight-card, .facility-card, .team-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
    })
  })
}

// 打字機效果初始化 - Typewriter effect initialization
function initializeTypewriterEffect() {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle && !heroTitle.classList.contains("typewriter-done")) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""
    heroTitle.classList.add("typewriter-done")

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }
}

// ==========================================
// 工具函數 - Utility functions
// ==========================================

// 防抖函數 - Debounce function
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// 節流函數 - Throttle function
function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments

    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 檢測設備類型 - Device detection
function isMobile() {
  return window.innerWidth <= 768
}

// 檢測是否支持觸摸 - Touch support detection
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

// ==========================================
// 響應式處理 - Responsive handling
// ==========================================
window.addEventListener(
  "resize",
  debounce(() => {
    // 重新計算粒子位置 - Recalculate particle positions
    const particles = document.querySelectorAll(".particle")
    particles.forEach((particle) => {
      particle.style.left = Math.random() * window.innerWidth + "px"
    })

    // 移動端菜單處理 - Mobile menu handling
    if (!isMobile() && isMenuOpen) {
      toggleMobileMenu()
    }

    console.log("📱 響應式調整完成 / Responsive adjustment completed")
  }, 250),
)

// ==========================================
// 鍵盤導航支持 - Keyboard navigation support
// ==========================================
document.addEventListener("keydown", (e) => {
  // ESC 鍵關閉移動端菜單 - ESC key closes mobile menu
  if (e.key === "Escape" && isMenuOpen) {
    toggleMobileMenu()
  }

  // 空格鍵或回車鍵激活按鈕 - Space or Enter key activates buttons
  if ((e.key === " " || e.key === "Enter") && e.target.classList.contains("nav-item")) {
    e.preventDefault()
    e.target.click()
  }
})

// ==========================================
// 圖片懶載入 - Image lazy loading
// ==========================================
function initializeLazyLoading() {
  if (!window.IntersectionObserver) {
    console.warn("IntersectionObserver not supported, skipping lazy loading")
    return
  }

  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// 預載入關鍵資源 - Preload critical resources
function preloadCriticalResources() {
  const criticalImages = [
    // 在這裡添加關鍵圖片URL - Add critical image URLs here
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&h=1080&fit=crop",
  ]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// ==========================================
// 錯誤處理 - Error handling
// ==========================================
window.addEventListener("error", (e) => {
  console.error("🚨 JavaScript錯誤:", e.error)
  // 可以在這裡添加錯誤報告邏輯 - Error reporting logic can be added here
})

// 未處理的Promise拒絕 - Unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("🚨 未處理的Promise拒絕:", e.reason)
  e.preventDefault()
})

// ==========================================
// 開發者工具 - Developer tools (僅在開發環境)
// ==========================================
// 移除了 process.env 檢查，改為簡單的開發模式檢測
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // 開發模式下的調試工具 - Debug tools in development mode
  window.stadiumDebug = {
    switchPage,
    updateLanguageDisplay,
    currentLanguage,
    currentPage,
    isMenuOpen,
  }

  console.log("🔧 開發者工具已載入 / Developer tools loaded")
  console.log("使用 window.stadiumDebug 訪問調試功能 / Use window.stadiumDebug to access debug functions")
}

// ==========================================
// 網站統計和分析 - Website analytics
// ==========================================
function trackPageView(pageName) {
  // 在這裡添加分析代碼 - Add analytics code here
  console.log(`📊 頁面瀏覽: ${pageName} / Page view: ${pageName}`)
}

function trackEvent(category, action, label) {
  // 在這裡添加事件追蹤代碼 - Add event tracking code here
  console.log(`📊 事件追蹤: ${category} - ${action} - ${label}`)
}

// ==========================================
// 輔助功能支持 - Accessibility support
// ==========================================
function initializeAccessibility() {
  // 跳過導航鏈接 - Skip navigation link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = currentLanguage === "zh" ? "跳過導航" : "Skip Navigation"
  skipLink.className = "sr-only"
  skipLink.addEventListener("focus", function () {
    this.classList.remove("sr-only")
  })
  skipLink.addEventListener("blur", function () {
    this.classList.add("sr-only")
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // 焦點管理 - Focus management
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation")
    }
  })

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation")
  })
}

// 初始化輔助功能 - Initialize accessibility
document.addEventListener("DOMContentLoaded", initializeAccessibility)

console.log("🎉 澳門工人體育場網站腳本載入完成！ / Macau Stadium Website script loaded successfully!")

//--------------------------------------------------------------------------------------------

