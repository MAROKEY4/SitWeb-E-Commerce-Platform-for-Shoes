 let menuList = document.getElementById("List")
        menuList.style.maxHeight = "0px";

        function togglelist(){
            if(menuList.style.maxHeight == "0px")
            
                menuList.style.maxHeight = "300px";
            
            else{
                menuList.style.maxHeight = "0px";
            }
        }
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.querySelector(".form");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      alert("Thank you for contacting us! We will get back to you soon.");
      contactForm.reset();
    });
  }
});
