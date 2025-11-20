// ... existing code from the original file ...
// (All other functions remain unchanged)

const notificationsData = [
  {
    id: 1,
    title: "Comment Management Guide Updated",
    description: "New tutorial added on bulk uploading comments efficiently",
    type: "info",
    time: "2 minutes ago",
    icon: "fa-graduation-cap",
  },
  {
    id: 2,
    title: "New Features Available",
    description: "Check out our latest features including history tracking and settings",
    type: "success",
    icon: "fa-star",
  },
  {
    id: 3,
    title: "System Maintenance Completed",
    description: "All systems are now online and running at optimal performance",
    type: "completed",
    icon: "fa-check-circle",
  },
]

const DEFAULT_ADMIN = {
  username: "ritik7428",
  password: "Vartik@7428",
}
const DEFAULT_ACCESS_CODE = "COMMENT-2025-SECURE"
const TIMER_SECONDS = 120

const TELEGRAM_BOT_TOKEN = "8400568059:AAGi7dkcSyoSwrqdHABaRkS8XU3XzhE9liI"
const TELEGRAM_BOT_TOKEN_COMMENTS = "8159241487:AAF6xqEpTh8LFmMpXt3DbeAIb6G0eM2sroQ"
const TELEGRAM_BOT_TOKEN_CONTACT = "8159241487:AAF6xqEpXt3DbeAIb6G0eM2sroQ"
const TELEGRAM_CHAT_ID = "YOUR_TELEGRAM_CHAT_ID"

const FIRST_VISIT_KEY = "commentPro_firstVisit"
const alertAutoCloseTimer = null

const SETTINGS_KEYS = {
  soundEffects: "commentPro_soundEffects",
  vibration: "commentPro_vibration",
  autoCopyNotif: "commentPro_autoCopyNotif",
  darkMode: "commentPro_darkMode",
}

const HISTORY_KEY = "commentPro_userHistory"

function sendOtpToTelegram(otp) {
  const now = new Date()
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  const message = `\u{1F510} *Admin OTP Authentication*\n\n\u{1F511} *Your OTP*: ${otp}\n\n\u{23F0} Expires in 10 minutes\n\n\u{1F4C5} *Date:* ${date}\n\u{23F1} *Time:* ${time}`

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

  fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: 5680242622,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("[v0] OTP sent to Telegram"))
    .catch((error) => console.error("[v0] OTP Error:", error))
}

function sendCommentLoadNotification(username, appName, quantity) {
  const now = new Date()
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })

  const data = getData()
  const app = data.applications.find((a) => a.name === appName)
  const remainingComments = app ? app.comments.length : 0

  const message = `\u{1F465} *User Activity:*\n\n\u{1F464} *User:* ${username}\n\u{1F4F1} *Application:* ${appName}\n\u{1F4CB} *Comments Loaded:* ${quantity}\n\u{1F4CA} *Comments Remaining:* ${remainingComments}\n\n\u{1F4C5} *Date:* ${date}\n\u{23F0} *Time:* ${time}`

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN_COMMENTS}/sendMessage`

  fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: 5680242622,
      text: message,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("[v0] Notification sent with emoji"))
    .catch((error) => console.error("[v0] Error:", error))
}

function initializeFirstVisitFlag() {
  if (!localStorage.getItem(FIRST_VISIT_KEY)) {
    localStorage.setItem(FIRST_VISIT_KEY, "true")
  }
}

function isFirstVisit() {
  return localStorage.getItem(FIRST_VISIT_KEY) === "true"
}

function setVisited() {
  localStorage.setItem(FIRST_VISIT_KEY, "false")
}

function initializeSettings() {
  if (!localStorage.getItem(SETTINGS_KEYS.soundEffects)) {
    localStorage.setItem(SETTINGS_KEYS.soundEffects, "true")
  }
  if (!localStorage.getItem(SETTINGS_KEYS.vibration)) {
    localStorage.setItem(SETTINGS_KEYS.vibration, "true")
  }
  if (!localStorage.getItem(SETTINGS_KEYS.autoCopyNotif)) {
    localStorage.setItem(SETTINGS_KEYS.autoCopyNotif, "true")
  }

  updateSettingsUI()
}

function updateSettingsUI() {
  document.getElementById("soundEffectsToggle").checked = localStorage.getItem(SETTINGS_KEYS.soundEffects) === "true"
  document.getElementById("vibrationToggle").checked = localStorage.getItem(SETTINGS_KEYS.vibration) === "true"
  document.getElementById("autoCopyToggle").checked = localStorage.getItem(SETTINGS_KEYS.autoCopyNotif) === "true"

  const isDark = document.documentElement.classList.contains("dark-mode")
  document.getElementById("darkModeToggle").checked = isDark
}

function toggleSoundEffects() {
  const isEnabled = document.getElementById("soundEffectsToggle").checked
  localStorage.setItem(SETTINGS_KEYS.soundEffects, isEnabled ? "true" : "false")
  showToast(isEnabled ? "Sound effects enabled" : "Sound effects disabled", "success", 2000)
}

function toggleVibration() {
  const isEnabled = document.getElementById("vibrationToggle").checked
  localStorage.setItem(SETTINGS_KEYS.vibration, isEnabled ? "true" : "false")
  showToast(isEnabled ? "Vibration enabled" : "Vibration disabled", "success", 2000)
}

function toggleAutoCopyNotif() {
  const isEnabled = document.getElementById("autoCopyToggle").checked
  localStorage.setItem(SETTINGS_KEYS.autoCopyNotif, isEnabled ? "true" : "false")
  showToast(isEnabled ? "Copy notifications enabled" : "Copy notifications disabled", "success", 2000)
}

function toggleDarkModeSetting() {
  const isEnabled = document.getElementById("darkModeToggle").checked
  const html = document.documentElement

  if (isEnabled) {
    html.classList.add("dark-mode")
    html.classList.remove("light-mode")
    localStorage.setItem("theme", "dark")
  } else {
    html.classList.remove("dark-mode")
    html.classList.add("light-mode")
    localStorage.setItem("theme", "light")
  }

  updateThemeIcon()
  showToast(isEnabled ? "Dark mode enabled" : "Light mode enabled", "success", 2000)
}

function addToHistory(username, appName, quantity) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []

  const now = new Date()
  const historyEntry = {
    id: Date.now(),
    username: username,
    application: appName,
    quantity: quantity,
    date: now.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }),
    time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }),
    timestamp: now.getTime(),
  }

  history.push(historyEntry)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

function getUserHistory(username) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
  return history.filter((entry) => entry.username === username)
}

function getAllHistory() {
  return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
}

// ===== History Management =====
function clearUserHistoryByUsername(username) {
  showConfirmationDialog(
    "Delete User History",
    `Are you sure you want to delete all history for user "${username}"? This cannot be undone.`,
    "fa-trash-alt",
    (confirmed) => {
      if (confirmed) {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
        history = history.filter((entry) => entry.username !== username)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
        showToast(`History for "${username}" deleted successfully`, "success")
        loadAdminUserHistory()
      }
    },
  )
}

function clearAllAdminHistory() {
  const adminUsername = DEFAULT_ADMIN.username
  showConfirmationDialog(
    "Clear My History",
    "Are you sure you want to delete all your admin history? This cannot be undone.",
    "fa-trash-alt",
    (confirmed) => {
      if (confirmed) {
        let history = JSON.Parse(localStorage.getItem(HISTORY_KEY)) || []
        history = history.filter((entry) => entry.username !== adminUsername)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
        showToast("Your admin history cleared successfully", "success")
        loadAdminUserHistory()
      }
    },
  )
}

function clearAllUserHistory() {
  showConfirmationDialog(
    "Clear All History",
    "Are you sure you want to delete ALL user history? This cannot be undone.",
    "fa-exclamation-triangle",
    (confirmed) => {
      if (confirmed) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify([]))
        showToast("All user history cleared successfully", "success")
        loadAdminUserHistory()
      }
    },
  )
}

function clearMyHistory() {
  const username = sessionStorage.getItem("currentUsername")
  if (!username) {
    showToast("Please login first", "warning")
    return
  }

  showConfirmationDialog(
    "Clear My History",
    "Are you sure you want to delete all your copy history? This cannot be undone.",
    "fa-trash-alt",
    (confirmed) => {
      if (confirmed) {
        let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || []
        history = history.filter((entry) => entry.username !== username)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
        showToast("Your history cleared successfully", "success")
        loadUserHistoryDisplay(username)
      }
    },
  )
}

function showSettings() {
  setVisited()
  hideAllPages()
  closeMenu()
  document.getElementById("settingsPage").style.display = "flex"
  initializeSettings()
}

function showUserHistory() {
  const username = sessionStorage.getItem("currentUsername")
  if (!username) {
    showToast("Please login first", "warning")
    return
  }

  switchUserTab(null, "myHistory")
  loadUserHistoryDisplay(username)
}

function switchUserTab(evt, tabName) {
  document.querySelectorAll(".user-tab-content").forEach((tab) => {
    tab.classList.remove("active")
    tab.style.display = "none"
  })

  document.querySelectorAll(".user-tab-btn").forEach((btn) => btn.classList.remove("active"))

  const showId = tabName + "Tab"
  const showEl = document.getElementById(showId)
  if (showEl) {
    showEl.classList.add("active")
    showEl.style.display = "block"
  }

  if (evt && evt.target) {
    evt.target.classList.add("active")
  }

  if (tabName === "myHistory") {
    const username = sessionStorage.getItem("currentUsername")
    if (username) {
      loadUserHistoryDisplay(username)
    }
  }
}

function loadUserHistoryDisplay(username) {
  const history = getUserHistory(username)
  const container = document.getElementById("userHistoryList")

  if (history.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No copy history yet</p>'
    return
  }

  let tableHtml = `
        <table class="history-data-table">
            <thead>
                <tr>
                    <th>Application</th>
                    <th>Quantity</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
    `

  history.reverse().forEach((entry) => {
    tableHtml += `
            <tr>
                <td class="col-app">${escapeHtml(entry.application)}</td>
                <td class="col-qty">${entry.quantity} comments</td>
                <td class="col-date">${entry.date}</td>
                <td class="col-time">${entry.time}</td>
            </tr>
        `
  })

  tableHtml += `
            </tbody>
        </table>
    `

  container.innerHTML = tableHtml
}

function filterUserHistory() {
  const searchText = document.getElementById("historySearchInput").value.toLowerCase()
  const history = getAllHistory()
  const filtered = history.filter(
    (entry) =>
      entry.username.toLowerCase().includes(searchText) || entry.application.toLowerCase().includes(searchText),
  )

  displayUserHistoryTable(filtered)
}

function displayUserHistoryTable(historyData) {
  const container = document.getElementById("userHistoryContainer")

  if (historyData.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: var(--text-muted); padding: 20px;">No history records found</p>'
    return
  }

  const uniqueUsernames = [...new Set(historyData.map((entry) => entry.username))]

  let tableHtml = `
        <div class="history-table-wrapper">
            <table class="history-data-table admin-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Application</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
    `

  historyData.reverse().forEach((entry) => {
    tableHtml += `
            <tr>
                <td class="col-user"><strong>${escapeHtml(entry.username)}</strong></td>
                <td class="col-app">${escapeHtml(entry.application)}</td>
                <td class="col-qty">${entry.quantity}</td>
                <td class="col-date">${entry.date}</td>
                <td class="col-time">${entry.time}</td>
            </tr>
        `
  })

  tableHtml += `
                </tbody>
            </table>
        </div>
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
            <h5 style="margin-bottom: 15px; color: var(--text-light);">Clear History Options</h5>
            <div style="margin-bottom: 15px;">
                <button class="btn btn-danger" onclick="clearAllUserHistory()">
                    <i class="fas fa-trash"></i> Clear All History
                </button>
            </div>
            <div style="margin-top: 15px;">
                <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 10px;">Delete specific user history:</p>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    `

  uniqueUsernames.forEach((username) => {
    tableHtml += `
            <button class="btn btn-outline-danger btn-sm" onclick="clearUserHistoryByUsername('${escapeJsString(username)}')">
                <i class="fas fa-trash"></i> ${escapeHtml(username)}
            </button>
        `
  })

  tableHtml += `
                </div>
            </div>
        </div>
    `

  container.innerHTML = tableHtml
}

function loadAdminUserHistory() {
  const history = getAllHistory()
  displayUserHistoryTable(history)
}

function exportUserHistory() {
  const history = getAllHistory()
  const csv =
    "User,Application,Quantity,Date,Time\n" +
    history
      .map((entry) => `"${entry.username}","${entry.application}","${entry.quantity}","${entry.date}","${entry.time}"`)
      .join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `user_history_${new Date().getTime()}.csv`
  link.click()

  showToast("History exported successfully", "success")
}

// ===== Load Button Lock / Countdown Variables =====
let loadButtonLocked = false
let loadBtnTimerId = null
let loadBtnRemaining = 0
const LOAD_BTN_STORAGE_KEY = "commentPro_loadBtnExpires"

function getLoadButtonElement() {
  return document.querySelector('button[onclick="loadComments()"]')
}

function restoreLoadBtnState() {
  const expires = sessionStorage.getItem(LOAD_BTN_STORAGE_KEY)
  const btn = getLoadButtonElement()
  if (!btn) return

  if (expires) {
    const remainingMs = Number(expires) - Date.now()
    if (remainingMs > 0) {
      startLoadBtnCountdown(Math.ceil(remainingMs / 1000))
    } else {
      sessionStorage.removeItem(LOAD_BTN_STORAGE_KEY)
      enableLoadButton()
    }
  } else {
    enableLoadButton()
  }
}

function formatSeconds(s) {
  return `${s}s`
}

function startLoadBtnCountdown(seconds = TIMER_SECONDS) {
  const btn = getLoadButtonElement()
  if (!btn) return

  if (loadBtnTimerId) {
    clearInterval(loadBtnTimerId)
    loadBtnTimerId = null
  }

  loadButtonLocked = true
  loadBtnRemaining = seconds
  btn.disabled = true
  btn.dataset.originalText = btn.dataset.originalText || btn.innerText || "Load"
  btn.innerText = `Wait ${formatSeconds(loadBtnRemaining)}`

  const expiresAt = Date.now() + loadBtnRemaining * 1000
  sessionStorage.setItem(LOAD_BTN_STORAGE_KEY, String(expiresAt))

  loadBtnTimerId = setInterval(() => {
    loadBtnRemaining--
    if (loadBtnRemaining < 0) loadBtnRemaining = 0
    btn.innerText = `Wait ${formatSeconds(loadBtnRemaining)}`

    if (loadBtnRemaining <= 0) {
      clearInterval(loadBtnTimerId)
      loadBtnTimerId = null
      sessionStorage.removeItem(LOAD_BTN_STORAGE_KEY)
      enableLoadButton()
    }
  }, 1000)
}

function enableLoadButton() {
  const btn = getLoadButtonElement()
  if (!btn) return

  loadButtonLocked = false
  loadBtnRemaining = 0
  btn.disabled = false
  const original = btn.dataset.originalText || "Load"
  btn.innerText = original
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFirstVisitFlag()
  initializeSettings()

  const savedTheme = localStorage.getItem("theme") || "dark"
  const html = document.documentElement

  if (savedTheme === "light") {
    html.classList.add("light-mode")
    html.classList.remove("dark-mode")
  } else {
    html.classList.add("dark-mode")
    html.classList.remove("light-mode")
  }

  updateThemeIcon()
  initializeStorage()
  goHome()

  restoreLoadBtnState()

  initializeConfirmationDialog()
})

function initializeConfirmationDialog() {
  const confirmBtn = document.getElementById("confirmBtn")
  const cancelBtn = document.getElementById("cancelBtn")

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (window.confirmCallback) {
        window.confirmCallback(true)
        window.confirmCallback = null
      }
      hideConfirmationDialog()
    })
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      hideConfirmationDialog()
      if (window.confirmCallback) {
        window.confirmCallback(false)
        window.confirmCallback = null
      }
    })
  }
}

function initializeStorage() {
  const raw = localStorage.getItem("commentProData")
  if (!raw) {
    const initialData = {
      applications: [],
      accessCode: DEFAULT_ACCESS_CODE,
      passwords: generatePasswords(),
      adminUsername: DEFAULT_ADMIN.username,
      adminPassword: DEFAULT_ADMIN.password,
    }
    localStorage.setItem("commentProData", JSON.stringify(initialData))
  }
}

function generatePasswords() {
  const passwords = []
  for (let i = 1; i <= 50; i++) {
    passwords.push(`pass${String(i).padStart(3, "0")}`)
  }
  return passwords
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

function getData() {
  return JSON.parse(localStorage.getItem("commentProData"))
}

function saveData(data) {
  localStorage.setItem("commentProData", JSON.stringify(data))
}

// ===== Navigation =====
function goHome() {
  hideAllPages()
  closeMenu()
  document.getElementById("homePage").style.display = "flex"
}

function goToAdminLogin() {
  setVisited()
  hideAllPages()
  closeMenu()
  document.getElementById("adminLoginPage").style.display = "flex"
  document.getElementById("adminUsername").value = ""
  document.getElementById("adminPassword").value = ""
}

function goToUserLogin() {
  setVisited()
  hideAllPages()
  closeMenu()
  document.getElementById("userLoginPage").style.display = "flex"
  document.getElementById("accessCode").value = ""
  document.getElementById("userPassword").value = ""
}

function hideAllPages() {
  const pages = [
    "homePage",
    "adminLoginPage",
    "adminOtpPage",
    "adminDashboard",
    "userLoginPage",
    "userDashboard",
    "chatbotPage",
    "whatsnewPage",
    "contactPage",
    "settingsPage",
  ]
  pages.forEach((id) => {
    const el = document.getElementById(id)
    if (el) el.style.display = "none"
  })
}

// ===== Admin Functions =====
function adminLogin(event) {
  event.preventDefault()
  const username = document.getElementById("adminUsername").value.trim()
  const password = document.getElementById("adminPassword").value.trim()
  const data = getData()

  if (!data) {
    showToast("No app data found. Resetting storage.", "warning")
    initializeStorage()
    return
  }

  if (username === data.adminUsername && password === data.adminPassword) {
    const otp = generateOtp()
    sessionStorage.setItem("adminOtp", otp)
    sessionStorage.setItem("adminTempUsername", username)
    sendOtpToTelegram(otp)
    hideAllPages()
    document.getElementById("adminOtpPage").style.display = "flex"
    document.getElementById("adminOtpInput").value = ""
    document.getElementById("adminOtpInput").focus()
    showToast("OTP sent to your Telegram bot", "success")
  } else {
    showToast("Invalid admin credentials! Please try again.", "error")
  }
}

function verifyAdminOtp(event) {
  event.preventDefault()
  const enteredOtp = document.getElementById("adminOtpInput").value.trim()
  const storedOtp = sessionStorage.getItem("adminOtp")

  if (!storedOtp) {
    showToast("OTP session expired. Please login again.", "error")
    goToAdminLogin()
    return
  }

  if (enteredOtp === storedOtp) {
    sessionStorage.setItem("adminLoggedIn", "true")
    sessionStorage.removeItem("adminOtp")
    hideAllPages()
    document.getElementById("adminDashboard").style.display = "block"
    loadAdminDashboard()
    showToast("Admin login successful!", "success")
  } else {
    showToast("Invalid OTP! Please try again.", "error")
    document.getElementById("adminOtpInput").value = ""
    document.getElementById("adminOtpInput").focus()
  }
}

function adminOtpCancel() {
  sessionStorage.removeItem("adminOtp")
  sessionStorage.removeItem("adminTempUsername")
  goToAdminLogin()
}

function adminLogout() {
  showConfirmationDialog(
    "Logout Confirmation",
    "Are you sure you want to logout from your admin account?",
    "fa-sign-out-alt",
    (confirmed) => {
      if (confirmed) {
        sessionStorage.removeItem("adminLoggedIn")
        sessionStorage.removeItem("adminOtp")
        showToast("Logged out successfully", "success")
        goHome()
      } 
    },
  )
}

function switchAdminTab(evt, tabName) {
  activateAdminTab(tabName)
  document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"))
  if (evt && evt.target) {
    evt.target.classList.add("active")
  }
}

function activateAdminTab(tabName) {
  document.querySelectorAll(".admin-tab-content").forEach((tab) => {
    tab.classList.remove("active")
    tab.style.display = "none"
  })

  const showId = tabName + "Tab"
  const showEl = document.getElementById(showId)
  if (showEl) {
    showEl.classList.add("active")
    showEl.style.display = "block"
  }
}

function addApplication() {
  const appName = document.getElementById("appNameInput").value.trim()
  if (!appName) {
    showToast("Please enter an application name", "warning")
    return
  }
  const data = getData()
  const exists = data.applications.some((a) => a.name.toLowerCase() === appName.toLowerCase())
  if (exists) {
    showToast("This application already exists!", "error")
    return
  }
  data.applications.push({ id: Date.now(), name: appName, comments: [] })
  saveData(data)
  document.getElementById("appNameInput").value = ""
  loadApplicationsList()
  loadAppSelectForComments()
  showToast(`Application "${appName}" added successfully!`, "success")
}

function deleteApplication(appId) {
  const data = getData()
  const appName = data.applications.find((a) => a.id === appId)?.name || "Application"

  showConfirmationDialog(
    "Delete Application",
    `Are you sure? This will delete "${appName}" and all its comments.`,
    "fa-trash-alt",
    (confirmed) => {
      if (confirmed) {
        const updatedData = getData()
        updatedData.applications = updatedData.applications.filter((a) => a.id !== appId)
        saveData(updatedData)
        loadApplicationsList()
        loadAppSelectForComments()
        showToast(`"${appName}" deleted successfully`, "success")
      }
    },
  )
}

function loadApplicationsList() {
  const data = getData()
  const container = document.getElementById("applicationsList")
  if (!container) return

  if (data.applications.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.5)">No applications added yet</p>'
    return
  }

  container.innerHTML = data.applications
    .map((app) => {
      return `
            <div class="app-item">
                <div class="app-text-block">
                    <div class="app-item-name">${escapeHtml(app.name)}</div>
                    <div class="app-item-count">${app.comments.length} comments</div>
                </div>
                <button class="app-delete-btn" onclick="deleteApplication(${app.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `
    })
    .join("")
}

function loadAppSelectForComments() {
  const data = getData()
  const select = document.getElementById("appSelectForComments")
  if (!select) return

  select.innerHTML =
    '<option value="">Choose an application...</option>' +
    data.applications.map((a) => `<option value="${a.id}">${escapeHtml(a.name)}</option>`).join("")
}

function addComments() {
  const appId = Number.parseInt(document.getElementById("appSelectForComments").value)
  const commentsRaw = document.getElementById("commentsTextarea").value.trim()
  if (!appId) {
    showToast("Please select an application", "warning")
    return
  }
  if (!commentsRaw) {
    showToast("Please paste some comments", "warning")
    return
  }

  const list = commentsRaw
    .split("\n")
    .map((s) => s.trim())
    .filter((s) => s)
  if (list.length === 0) {
    showToast("No valid comments found", "warning")
    return
  }

  const data = getData()
  const app = data.applications.find((a) => a.id === appId)
  if (!app) {
    showToast("Application not found", "error")
    return
  }

  app.comments.push(...list)
  saveData(data)

  document.getElementById("commentsTextarea").value = ""
  loadApplicationsList()
  loadAppSelectForComments()
  showToast(`Successfully added ${list.length} comments!`, "success")
}

function loadAccessCodesDisplay() {
  const data = getData()
  document.getElementById("accessCodeDisplay").textContent = data.accessCode || DEFAULT_ACCESS_CODE

  const pl = document.getElementById("passwordsList")
  if (!pl) return

  pl.innerHTML = (data.passwords || []).map((p) => `<div class="password-item">${escapeHtml(p)}</div>`).join("")
}

// ===== Admin Profile Management =====
function changeAdminUsername() {
  const newUsername = document.getElementById("newAdminUsername").value.trim()

  if (!newUsername) {
    showToast("Please enter a new username", "warning")
    return
  }

  if (newUsername.length < 3) {
    showToast("Username must be at least 3 characters long", "warning")
    return
  }

  const data = getData()
  const oldUsername = data.adminUsername
  data.adminUsername = newUsername
  saveData(data)

  document.getElementById("newAdminUsername").value = ""
  document.getElementById("currentAdminUsername").textContent = newUsername

  showToast(`Username changed from "${oldUsername}" to "${newUsername}" successfully!`, "success")
}

function changeAdminPassword() {
  const currentPassword = document.getElementById("currentAdminPassword").value
  const newPassword = document.getElementById("newAdminPassword").value
  const confirmPassword = document.getElementById("confirmAdminPassword").value

  if (!currentPassword || !newPassword || !confirmPassword) {
    showToast("Please fill in all password fields", "warning")
    return
  }

  const data = getData()

  if (currentPassword !== data.adminPassword) {
    showToast("Current password is incorrect", "error")
    return
  }

  if (newPassword.length < 6) {
    showToast("New password must be at least 6 characters long", "warning")
    return
  }

  if (newPassword !== confirmPassword) {
    showToast("New passwords do not match", "error")
    return
  }

  data.adminPassword = newPassword
  saveData(data)

  document.getElementById("currentAdminPassword").value = ""
  document.getElementById("newAdminPassword").value = ""
  document.getElementById("confirmAdminPassword").value = ""

  showCustomSuccessDialog("Password Changed Successfully", "Your admin password has been updated successfully!")
}

function loadAdminProfileInfo() {
  const data = getData()
  document.getElementById("currentAdminUsername").textContent = data.adminUsername || DEFAULT_ADMIN.username
}

// ===== User Functions =====
function userLogin(event) {
  event.preventDefault()
  const accessCode = document.getElementById("accessCode").value.trim()
  const userPassword = document.getElementById("userPassword").value.trim()
  const data = getData()

  if (!data) {
    showToast("App data missing. Resetting.", "warning")
    initializeStorage()
    return
  }

  if (accessCode !== data.accessCode) {
    showToast("Invalid access code!", "error")
    document.getElementById("accessCode").value = ""
    document.getElementById("accessCode").focus()
    return
  }

  if (!data.passwords.includes(userPassword)) {
    showToast("Invalid password!", "error")
    document.getElementById("userPassword").value = ""
    document.getElementById("userPassword").focus()
    return
  }

  sessionStorage.setItem("userLoggedIn", "true")
  sessionStorage.setItem("currentUsername", userPassword)
  hideAllPages()
  document.getElementById("userDashboard").style.display = "block"
  loadUserDashboard()
  showToast(`Welcome ${userPassword}! Dashboard loaded.`, "success")
}

function userLogout() {
  showConfirmationDialog("Logout Confirmation", "Are you sure you want to logout?", "fa-sign-out-alt", (confirmed) => {
    if (confirmed) {
      sessionStorage.removeItem("userLoggedIn")
      clearRunningTimer()
      sessionStorage.removeItem("currentDisplayedComments")
      document.getElementById("commentSection").style.display = "none"
      showToast("Logged out successfully!", "success")
      goHome()
    }
  })
}

function loadUserDashboard() {
  const data = getData()
  const container = document.getElementById("userAppList")
  if (!container) return

  if (data.applications.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:rgba(255,255,255,0.5)">No applications available</p>'
    return
  }

  container.innerHTML = data.applications
    .map(
      (app) => `
        <div class="user-app-card"
             onclick="selectApp(${app.id}, '${escapeJsString(app.name)}', ${app.comments.length})">
            <i class="fas fa-mobile-alt"></i>
            <h4>${escapeHtml(app.name)}</h4>
            <p>${app.comments.length} comments</p>
        </div>
    `,
    )
    .join("")
}

function selectApp(appId, appName, totalComments) {
  if (totalComments === 0) {
    showToast(`"${appName}" has no comments available yet`, "warning")
    return
  }

  document.getElementById("selectedAppName").textContent = appName
  document.getElementById("commentQuantity").value = ""
  document.getElementById("commentsDisplay").innerHTML = ""
  document.getElementById("commentSection").style.display = "block"
  document.getElementById("commentSection").scrollIntoView({ behavior: "smooth" })

  sessionStorage.setItem("selectedAppId", appId)

  clearRunningTimer()
  showToast(`${totalComments} comments available for "${appName}"`, "info")
}

function loadComments() {
  if (loadButtonLocked) {
    const remaining =
      loadBtnRemaining ||
      Math.max(0, Math.ceil((Number(sessionStorage.getItem(LOAD_BTN_STORAGE_KEY) || 0) - Date.now()) / 1000))
    showToast(`Please wait ${remaining}s before loading again.`, "warning")
    return
  }

  const appId = Number.parseInt(sessionStorage.getItem("selectedAppId"))
  const quantity = Number.parseInt(document.getElementById("commentQuantity").value)

  if (!appId) {
    showToast("Please select an application first", "warning")
    return
  }
  if (!quantity || quantity < 1) {
    showToast("Please enter a valid quantity", "warning")
    return
  }

  const data = getData()
  const app = data.applications.find((a) => a.id === appId)
  if (!app || app.comments.length === 0) {
    showToast("No comments available for this app", "error")
    return
  }

  if (quantity > app.comments.length) {
    showToast(`Only ${app.comments.length} comments available`, "warning")
    return
  }

  const selectedComments = app.comments.slice(0, quantity)
  displayComments(selectedComments, appId, quantity)

  removeCommentsFromBackend(appId, quantity)

  const username = sessionStorage.getItem("currentUsername")
  const appName = app.name

  if (username) {
    addToHistory(username, appName, quantity)
    sendCommentLoadNotification(username, appName, quantity)
  }

  startLoadBtnCountdown(TIMER_SECONDS)
}

// ===== Copy Functions =====
function copySingleComment(comment) {
  navigator.clipboard
    .writeText(comment)
    .then(() => {
      showToast("Comment copied!", "success", 2500)
    })
    .catch(() => {
      fallbackClipboard(comment)
      showToast("Comment copied!", "success", 2500)
    })
}

function copyAllComments(comments) {
  if (!comments || comments.length === 0) {
    showToast("No comments to copy", "warning")
    return
  }

  const all = comments.join("\n\n")

  navigator.clipboard
    .writeText(all)
    .then(() => {
      showToast(`All ${comments.length} comments copied!`, "success", 2500)
    })
    .catch(() => {
      fallbackClipboard(all)
      showToast(`All ${comments.length} comments copied!`, "success", 2500)
    })
}

function fallbackClipboard(text) {
  const ta = document.createElement("textarea")
  ta.value = text
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand("copy")
    showToast("Copied successfully!", "success")
  } catch (e) {
    showToast("Unable to copy.", "error")
  }
  ta.remove()
}

// ===== Timer Logic =====
let timerIntervalId = null
let timerRemaining = TIMER_SECONDS

function startTimer(appId, quantity) {
  clearRunningTimer()
  timerRemaining = TIMER_SECONDS

  const timerDisplay = document.getElementById("timerDisplay")
  const countdownDisplay = document.getElementById("countdownValue")
  const countdownProgress = document.getElementById("countdownProgress")

  if (timerDisplay) {
    timerDisplay.style.display = "block"
  }
  if (countdownDisplay) {
    countdownDisplay.textContent = timerRemaining
  }
  if (countdownProgress) {
    countdownProgress.style.width = "100%"
  }

  timerIntervalId = setInterval(() => {
    timerRemaining--

    if (countdownDisplay) {
      countdownDisplay.textContent = timerRemaining
    }

    if (countdownProgress) {
      const percentage = (timerRemaining / TIMER_SECONDS) * 100
      countdownProgress.style.width = percentage + "%"
    }

    if (timerRemaining <= 0) {
      clearRunningTimer()
      clearSessionDisplay()
    }
  }, 1000)
}

function clearRunningTimer() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId)
    timerIntervalId = null
  }
  const timerDisplay = document.getElementById("timerDisplay")
  if (timerDisplay) timerDisplay.style.display = "none"
}

// ===== Utility Functions =====
function escapeHtml(str) {
  if (!str) return ""
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function escapeJsString(str) {
  if (!str) return ""
  return str.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"')
}

// ===== Theme Management =====
function toggleTheme() {
  const html = document.documentElement
  const isDark = html.classList.contains("dark-mode")

  if (isDark) {
    html.classList.remove("dark-mode")
    html.classList.add("light-mode")
    localStorage.setItem("theme", "light")
  } else {
    html.classList.remove("light-mode")
    html.classList.add("dark-mode")
    localStorage.setItem("theme", "dark")
  }

  updateThemeIcon()
}

function updateThemeIcon() {
  const html = document.documentElement
  const icon = document.querySelector(".theme-toggle i")
  if (html.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
  } else {
    icon.classList.remove("fa-sun")
    icon.classList.add("fa-moon")
  }
}

// ===== Menu Management =====
function toggleMenu() {
  const menu = document.getElementById("sideMenu")
  const overlay = document.getElementById("menuOverlay")

  menu.classList.toggle("active")
  overlay.classList.toggle("active")
}

function closeMenu() {
  const menu = document.getElementById("sideMenu")
  const overlay = document.getElementById("menuOverlay")

  menu.classList.remove("active")
  overlay.classList.remove("active")
}

// ===== Feature Pages =====
function showFeature(feature) {
  setVisited()
  hideAllPages()
  closeMenu()

  switch (feature) {
    case "chatbot":
      document.getElementById("chatbotPage").style.display = "flex"
      break
    case "whatsnew":
      document.getElementById("whatsnewPage").style.display = "flex"
      break
    case "contact":
      document.getElementById("contactPage").style.display = "flex"
      break
  }
}

function showNotifications() {
  const modal = document.getElementById("notificationModal")
  const list = document.getElementById("notificationsList")

  if (notificationsData.length === 0) {
    list.innerHTML = `<div style="padding: 40px 20px; text-align: center; color: var(--text-muted);"><i class="fas fa-inbox" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i><p>No notifications</p></div>`
  } else {
    list.innerHTML = notificationsData
      .map(
        (notif, index) => `
            <div class="notification-item">
                <div class="notification-icon ${notif.type}">
                    <i class="fas ${notif.icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${escapeHtml(notif.title)}</div>
                    <div class="notification-message">${escapeHtml(notif.description)}</div>
                    <div class="notification-time">${notif.time}</div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  modal.classList.add("active")
}

function closeNotificationModal(event) {
  if (event && event.target.id !== "notificationModal") return
  const modal = document.getElementById("notificationModal")
  modal.classList.remove("active")
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("notificationModal")
    if (modal && modal.classList.contains("active")) {
      modal.classList.remove("active")
    }
  }
})

// ===== Toast Notifications =====
function showToast(message, type = "info", duration = null) {
  const shouldPlaySound = localStorage.getItem(SETTINGS_KEYS.soundEffects) === "true"
  const shouldVibrate = localStorage.getItem(SETTINGS_KEYS.vibration) === "true"

  if (shouldPlaySound) {
    playSound(type)
  }

  if (shouldVibrate && type === "error") {
    triggerVibration("error")
  }

  let toastContainer = document.getElementById("toastContainer")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.id = "toastContainer"
    toastContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `
    document.body.appendChild(toastContainer)
  }

  const toast = document.createElement("div")
  const colors = {
    success: { bg: "#4CAF50", text: "#fff", icon: "fa-check-circle" },
    error: { bg: "#f44336", text: "#fff", icon: "fa-times-circle" },
    warning: { bg: "#ff9800", text: "#fff", icon: "fa-exclamation-circle" },
    info: { bg: "#2196F3", text: "#fff", icon: "fa-info-circle" },
  }

  const config = colors[type] || colors.info
  const autoDuration = duration || (type === "success" ? 4000 : 5000)

  toast.style.cssText = `
        background: ${config.bg};
        color: ${config.text};
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
        font-size: 14px;
        font-weight: 500;
        max-width: 350px;
        word-wrap: break-word;
    `

  toast.innerHTML = `
        <i class="fas ${config.icon}" style="font-size: 18px; flex-shrink: 0;"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 18px;
            margin-left: auto;
            padding: 0;
            display: flex;
            align-items: center;
        ">
            <i class="fas fa-times"></i>
        </button>
    `

  toastContainer.appendChild(toast)

  if (autoDuration > 0) {
    setTimeout(() => {
      if (toast.parentElement) {
        toast.style.animation = "slideOutRight 0.3s ease-in forwards"
        setTimeout(() => toast.remove(), 300)
      }
    }, autoDuration)
  }
}

function displayComments(selectedComments, appId, quantity) {
  const container = document.getElementById("commentsDisplay")
  if (!container) return

  container.innerHTML =
    `
        <div id="countdownTimer" class="countdown-timer-section">
            <div class="countdown-header">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Comments expire in: <strong id="countdownValue">120</strong> seconds</span>
            </div>
            <div class="countdown-bar">
                <div id="countdownProgress" class="countdown-progress"></div>
            </div>
            <p class="countdown-warning">Copy all comments before they expire!</p>
        </div>
        <button class="copy-all-btn" onclick="copyAllComments(${JSON.stringify(selectedComments).replace(/"/g, "&quot;")})">
            <i class="fas fa-copy"></i> Copy All ${selectedComments.length} Comments
        </button>
    ` +
    selectedComments
      .map(
        (comment, index) => `
        <div class="comment-item">
            <div class="comment-text">${escapeHtml(comment)}</div>
            <div class="comment-actions">
                <button class="copy-btn" onclick="copySingleComment('${escapeJsString(comment)}')">
                    <i class="fas fa-copy"></i> Copy
                </button>
            </div>
        </div>
    `,
      )
      .join("")

  startTimer(appId, quantity)
}

function triggerVibration(type) {
  if (!navigator.vibrate) return

  if (type === "error") {
    navigator.vibrate([200, 100, 200])
  } else if (type === "success") {
    navigator.vibrate([50, 30, 50])
  }
}

function clearSessionDisplay() {
  document.getElementById("commentSection").style.display = "none"
  clearRunningTimer()
  sessionStorage.removeItem("currentDisplayedComments")
  showToast("Session expired! Comments cleared.", "warning")
}

function removeCommentsFromBackend(appId, quantity) {
  const data = getData()
  const app = data.applications.find((a) => a.id === appId)
  if (!app) return

  app.comments = app.comments.slice(quantity)
  saveData(data)
}

function showConfirmationDialog(title, message, icon, callback) {
  let confirmModal = document.getElementById("customConfirmModal")

  if (!confirmModal) {
    confirmModal = document.createElement("div")
    confirmModal.id = "customConfirmModal"
    confirmModal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `
    document.body.appendChild(confirmModal)
  }

  const isDarkMode = document.documentElement.classList.contains("dark-mode")
  const bgColor = isDarkMode ? "#000000" : "#ffffff"
  const textColor = isDarkMode ? "#ffffff" : "#333333"

  confirmModal.innerHTML = `
        <div style="
            background: ${bgColor};
            border-radius: 12px;
            padding: 32px;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            text-align: center;
            animation: scaleIn 0.3s ease-out;
        ">
            <div style="font-size: 48px; margin-bottom: 16px; line-height: 1;">
                <i class="fas ${icon}" style="color: #2196F3;"></i>
            </div>
            <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 12px 0; color: ${textColor};">${title}</h3>
            <p style="font-size: 14px; color: ${isDarkMode ? "#cccccc" : "#666666"}; margin: 0 0 28px 0;">${message}</p>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="confirmYesBtn" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                    Confirm
                </button>
                <button id="confirmNoBtn" style="
                    background: #f44336;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#da190b'" onmouseout="this.style.background='#f44336'">
                    Cancel
                </button>
            </div>
        </div>
    `

  confirmModal.style.display = "flex"

  document.getElementById("confirmYesBtn").addEventListener("click", () => {
    confirmModal.style.display = "none"
    if (callback) callback(true)
  })

  document.getElementById("confirmNoBtn").addEventListener("click", () => {
    confirmModal.style.display = "none"
    if (callback) callback(false)
  })

  confirmModal.addEventListener("click", (e) => {
    if (e.target === confirmModal) {
      confirmModal.style.display = "none"
      if (callback) callback(false)
    }
  })
}

function hideConfirmationDialog() {
  const modal = document.getElementById("customConfirmModal")
  if (modal) modal.style.display = "none"
}

function showCustomSuccessDialog(title, message) {
  let modal = document.getElementById("customSuccessModal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "customSuccessModal"
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `
    document.body.appendChild(modal)
  }

  const isDarkMode = document.documentElement.classList.contains("dark-mode")
  const bgColor = isDarkMode ? "#000000" : "#ffffff"
  const textColor = isDarkMode ? "#ffffff" : "#333333"

  modal.innerHTML = `
        <div style="
            background: ${bgColor};
            border-radius: 12px;
            padding: 40px;
            max-width: 400px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            text-align: center;
            animation: scaleIn 0.3s ease-out;
        ">
            <div style="font-size: 56px; margin-bottom: 20px; line-height: 1;">
                <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
            </div>
            <h3 style="font-size: 22px; font-weight: 600; margin: 0 0 12px 0; color: #4CAF50;">${title}</h3>
            <p style="font-size: 14px; color: ${isDarkMode ? "#cccccc" : "#666666"}; margin: 0 0 24px 0;">${message}</p>
            <button id="successOkBtn" style="
                background: #4CAF50;
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: background 0.2s;
                font-size: 16px;
            " onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                OK
            </button>
        </div>
    `

  modal.style.display = "flex"

  document.getElementById("successOkBtn").addEventListener("click", () => {
    modal.style.display = "none"
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })
}

function playSound(type) {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const now = audioContext.currentTime

    if (type === "success") {
      const frequencies = [523.25, 659.25, 783.99]
      frequencies.forEach((freq, index) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()

        osc.type = "sine"
        osc.frequency.value = freq
        osc.connect(gain)
        gain.connect(audioContext.destination)

        const startTime = now + index * 0.1
        gain.gain.setValueAtTime(0.3, startTime)
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2)

        osc.start(startTime)
        osc.stop(startTime + 0.2)
      })
    } else if (type === "error") {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()

      osc.frequency.setValueAtTime(600, now)
      osc.frequency.linearRampToValueAtTime(300, now + 0.4)

      osc.connect(gain)
      gain.connect(audioContext.destination)

      gain.gain.setValueAtTime(0.4, now)
      gain.gain.linearRampToValueAtTime(0, now + 0.4)

      osc.start(now)
      osc.stop(now + 0.4)
    } else if (type === "warning") {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()

      osc.frequency.value = 800
      osc.connect(gain)
      gain.connect(audioContext.destination)

      gain.gain.setValueAtTime(0.3, now)
      gain.gain.linearRampToValueAtTime(0, now + 0.1)
      osc.start(now)
      osc.stop(now + 0.1)

      gain.gain.setValueAtTime(0.3, now + 0.15)
      gain.gain.linearRampToValueAtTime(0, now + 0.25)
      osc.start(now + 0.15)
      osc.stop(now + 0.25)
    }
  } catch (e) {
    console.log("[v0] Audio error:", e.message)
  }
}

// ===== User Password Management =====
function loadUserPasswordsList() {
  const data = getData()
  const container = document.getElementById("userPasswordsList")

  if (!container) return

  let html = '<div class="passwords-management-container">'

  data.passwords.forEach((password, index) => {
    const userNum = index + 1
    html += `
            <div class="password-management-item">
                <div class="password-item-info">
                    <div class="password-user-id">User #${userNum}</div>
                    <div class="password-display">${escapeHtml(password)}</div>
                </div>
                <div class="password-item-actions">
                    <button class="btn btn-sm btn-outline-primary" onclick="copyPasswordToClipboard('${escapeJsString(password)}', ${userNum})">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                    <button class="btn btn-sm btn-warning" onclick="editUserPassword(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            </div>
        `
  })

  html += "</div>"
  container.innerHTML = html
}

function copyPasswordToClipboard(password, userNum) {
  navigator.clipboard
    .writeText(password)
    .then(() => {
      showToast(`User #${userNum} password copied!`, "success")
    })
    .catch(() => {
      const ta = document.createElement("textarea")
      ta.value = password
      document.body.appendChild(ta)
      ta.select()
      document.execCommand("copy")
      ta.remove()
      showToast(`User #${userNum} password copied!`, "success")
    })
}

function editUserPassword(index) {
  const data = getData()
  const currentPassword = data.passwords[index]
  const userNum = index + 1

  showPasswordEditDialog(userNum, currentPassword, (newPassword) => {
    if (newPassword === null) return

    if (!newPassword.trim()) {
      showToast("Password cannot be empty", "warning")
      return
    }

    data.passwords[index] = newPassword.trim()
    saveData(data)
    loadUserPasswordsList()
    showToast(`Password for User #${userNum} updated successfully!`, "success")
  })
}

function showPasswordEditDialog(userNum, currentPassword, callback) {
  let modal = document.getElementById("customPasswordEditModal")

  if (!modal) {
    modal = document.createElement("div")
    modal.id = "customPasswordEditModal"
    document.body.appendChild(modal)
  }

  const isDarkMode = document.documentElement.classList.contains("dark-mode")
  const bgColor = isDarkMode ? "#000000" : "#ffffff"
  const textColor = isDarkMode ? "#ffffff" : "#333333"
  const inputBgColor = isDarkMode ? "#1a1a1a" : "#f5f5f5"
  const inputTextColor = isDarkMode ? "#ffffff" : "#333333"

  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `

  modal.innerHTML = `
        <div style="
            background: ${bgColor};
            border-radius: 12px;
            padding: 32px;
            max-width: 420px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            animation: scaleIn 0.3s ease-out;
        ">
            <div style="font-size: 40px; margin-bottom: 16px; line-height: 1;">
                <i class="fas fa-key" style="color: #2196F3;"></i>
            </div>
            <h3 style="font-size: 20px; font-weight: 600; margin: 0 0 8px 0; color: ${textColor};">Edit Password for User #${userNum}</h3>
            <p style="font-size: 13px; color: ${isDarkMode ? "#aaaaaa" : "#999999"}; margin: 0 0 20px 0;">Current: ${escapeHtml(currentPassword)}</p>
            
            <label style="display: block; font-size: 14px; color: ${textColor}; margin-bottom: 8px; font-weight: 500;">Enter new password:</label>
            <input id="newPasswordInput" type="text" placeholder="Enter new password" style="
                width: 100%;
                padding: 12px;
                border: 1px solid ${isDarkMode ? "#333333" : "#dddddd"};
                border-radius: 6px;
                background: ${inputBgColor};
                color: ${inputTextColor};
                font-size: 14px;
                box-sizing: border-box;
                margin-bottom: 24px;
                transition: border-color 0.2s;
            " onfocus="this.style.borderColor='#2196F3'" onblur="this.style.borderColor='${isDarkMode ? "#333333" : "#dddddd"}'" />
            
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
                <button id="passwordCancelBtn" style="
                    background: #f44336;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#da190b'" onmouseout="this.style.background='#f44336'">
                    Cancel
                </button>
                <button id="passwordOkBtn" style="
                    background: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: background 0.2s;
                " onmouseover="this.style.background='#45a049'" onmouseout="this.style.background='#4CAF50'">
                    Confirm
                </button>
            </div>
        </div>
    `

  modal.style.display = "flex"

  const inputField = document.getElementById("newPasswordInput")
  inputField.focus()

  const handleConfirm = () => {
    const newPassword = inputField.value
    modal.style.display = "none"
    callback(newPassword)
  }

  const handleCancel = () => {
    modal.style.display = "none"
    callback(null)
  }

  document.getElementById("passwordOkBtn").addEventListener("click", handleConfirm)
  document.getElementById("passwordCancelBtn").addEventListener("click", handleCancel)

  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleConfirm()
    }
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      handleCancel()
    }
  })
}

function resetAllPasswords() {
  showConfirmationDialog(
    "Reset All Passwords",
    "Are you sure you want to reset all 50 user passwords to default values? This cannot be undone.",
    "fa-redo",
    (confirmed) => {
      if (confirmed) {
        const data = getData()
        data.passwords = generatePasswords()
        saveData(data)
        loadUserPasswordsList()
        showToast("All passwords reset to default successfully!", "success")
      }
    },
  )
}

function filterPasswords() {
  const searchText = document.getElementById("passwordSearchInput").value.toLowerCase()
  const data = getData()
  const container = document.getElementById("userPasswordsList")

  if (!container) return

  let html = '<div class="passwords-management-container">'
  let count = 0

  data.passwords.forEach((password, index) => {
    const userNum = index + 1
    if (password.toLowerCase().includes(searchText) || userNum.toString().includes(searchText)) {
      html += `
                <div class="password-management-item">
                    <div class="password-item-info">
                        <div class="password-user-id">User #${userNum}</div>
                        <div class="password-display">${escapeHtml(password)}</div>
                    </div>
                    <div class="password-item-actions">
                        <button class="btn btn-sm btn-outline-primary" onclick="copyPasswordToClipboard('${escapeJsString(password)}', ${userNum})">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="editUserPassword(${index})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            `
      count++
    }
  })

  if (count === 0) {
    html += '<p style="text-align: center; color: var(--text-muted); padding: 40px;">No passwords match your search</p>'
  }

  html += "</div>"
  container.innerHTML = html
}

function loadAdminDashboard() {
  loadApplicationsList()
  loadAppSelectForComments()
  loadAccessCodesDisplay()
  loadAdminUserHistory()
  loadUserPasswordsList()
  loadAdminProfileInfo()
  activateAdminTab("applications")
}

function sendContactFormToTelegram(name, email, message) {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const TELEGRAM_BOT_TOKEN_CONTACT = "8159241487:AAF6xqEpTh8LFmMpXt3DbeAIb6G0eM2sroQ";
  const CHAT_ID = 5680242622;

  const telegramMessage = `\u{1F4E7} *New Contact Form Submission:*\n
\u{1F464} *Name:* ${name}\n
\u{1F4E8} *Email:* ${email}\n
\u{1F4AC} *Message:* ${message}\n
\u{1F4C5} *Date:* ${date}\n\u{23F0} *Time:* ${time}`;

  const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN_CONTACT}/sendMessage`;

  fetch(telegramUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: telegramMessage,
      parse_mode: "Markdown",
    }),
  })
    .then((response) => response.json())
    .then(() => console.log("Contact form sent via Telegram"))
    .catch((error) => console.error("Telegram error:", error));
}


// -------------------- CONTACT FORM HANDLER --------------------
function handleContactForm(event) {
  event.preventDefault();

  const name = event.target.querySelector("input[type='text']").value.trim();
  const email = event.target.querySelector("input[type='email']").value.trim();
  const message = event.target.querySelector("textarea").value.trim();

  if (name && email && message) {
    sendContactFormToTelegram(name, email, message);
  }

  showToast("Thank you! We will get back to you soon.", "success");
  event.target.reset();
}