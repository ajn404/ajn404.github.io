<template>
  <div>
    <!-- Simple modal dialog containing a form -->
    <dialog id="favDialog" class="p-10">
      <form method="dialog">
        <p>
          <label
            >Favorite animal:
            <select>
              <option value="default">Choose…</option>
              <option>Brine shrimp</option>
              <option>Red panda</option>
              <option>Spider monkey</option>
            </select>
          </label>
        </p>
        <div>
          <button value="cancel " class="m-2 cursor-wait">Cancel</button>
          <button id="confirmBtn" value="default">Confirm</button>
        </div>
      </form>
    </dialog>
    <p>
      <button id="updateDetails" class="text-skin-orange">
        Update details
      </button>
    </p>
    <output></output>
  </div>
</template>

<script setup>
import { nextTick } from "vue";

nextTick(() => {
  const updateButton = document.getElementById("updateDetails");
  const favDialog = document.getElementById("favDialog");
  const outputBox = document.querySelector("output");
  const selectEl = favDialog.querySelector("select");
  const confirmBtn = favDialog.querySelector("#confirmBtn");

  // If a browser doesn't support the dialog, then hide the
  // dialog contents by default.
  if (typeof favDialog.showModal !== "function") {
    favDialog.hidden = true;
    /* a fallback script to allow this dialog/form to function
           for legacy browsers that do not support <dialog>
           could be provided here.
        */
  }
  // "Update details" button opens the <dialog> modally
  updateButton.addEventListener("click", () => {
    if (typeof favDialog.showModal === "function") {
      favDialog.showModal();
    } else {
      outputBox.value =
        "Sorry, the <dialog> API is not supported by this browser.";
    }
  });
  // "Favorite animal" input sets the value of the submit button
  selectEl.addEventListener("change", e => {
    confirmBtn.value = selectEl.value;
  });
  // "Confirm" button of form triggers "close" on dialog because of [method="dialog"]
  favDialog.addEventListener("close", () => {
    outputBox.value = `${
      favDialog.returnValue
    } button clicked - ${new Date().toString()}`;
  });
});
</script>
