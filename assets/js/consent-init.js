window.silktideConsentManager.init({
  consentTypes: [
    {
      id: "necessary",
      label: "Necessary",
      description: "<p>Required for the basket and basic site function. These cookies cannot be disabled.</p>",
      required: true
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "<p>Help us understand how the nursery is browsed so we can quietly improve it. No personal profile is built.</p>",
      defaultValue: false,
      onAccept: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", { analytics_storage: "granted" });
        }
      },
      onReject: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", { analytics_storage: "denied" });
        }
      }
    },
    {
      id: "advertising",
      label: "Advertising",
      description: "<p>Used only if we ever introduce remarketing for the atelier. None are active today.</p>",
      defaultValue: false,
      onAccept: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted"
          });
        }
      },
      onReject: function () {
        if (typeof gtag === "function") {
          gtag("consent", "update", {
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied"
          });
        }
      }
    }
  ],
  text: {
    prompt: {
      description: "<p>We use a small number of cookies to keep your basket working and, with your consent, to learn how the nursery is being visited. Read our <a href=\"privacy.html\">Privacy Notice</a>.</p>",
      acceptAllButtonText: "Accept all",
      rejectNonEssentialButtonText: "Decline",
      preferencesButtonText: "Preferences"
    },
    preferences: {
      title: "Cookie preferences",
      description: "<p>Choose which cookies you are happy for us to use. You can change these at any time through the cookie icon at the bottom of the page.</p>",
      saveButtonText: "Save preferences",
      creditLinkText: "",
      creditLinkAccessibleLabel: ""
    }
  }
});

document.addEventListener("click", function (e) {
  const trigger = e.target.closest("[data-cookie-settings]");
  if (!trigger) return;
  e.preventDefault();
  const instance = window.silktideConsentManager && window.silktideConsentManager.getInstance && window.silktideConsentManager.getInstance();
  if (instance && typeof instance.toggleModal === "function") {
    instance.toggleModal(true);
  }
});
