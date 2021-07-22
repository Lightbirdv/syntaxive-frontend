
// $(document).ready(function() {             
//   $('#loginModal').modal('show');
//     $(function () {
//       $('[data-toggle="tooltip"]').tooltip()
//     })
//   });

var navTrigger = document.getElementsByClassName('nav-trigger')[0],
body = document.getElementsByTagName('body')[0];

navTrigger.addEventListener('click', toggleNavigation);

function toggleNavigation(event) {
event.preventDefault();
body.classList.toggle('nav-open');
}

