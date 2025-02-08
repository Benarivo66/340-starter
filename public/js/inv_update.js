const form = document.querySelector("#updateForm")
    form.addEventListener("change", function () {
      const updateBtn = document.querySelector("#updateForm button")
      updateBtn.removeAttribute("disabled")
    })


