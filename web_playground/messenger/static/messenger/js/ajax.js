(function() {
    "use strict";
    document.addEventListener('DOMContentLoaded', () => {
        // Constants
        var btn = document.querySelector('#testBtn');
        const url = document.querySelector('#url');
        const content = document.querySelector('#message');

        // verifications
        if (content.value == '') {
            btn.disabled = true;
        }
        content.addEventListener('input', () => {
            if (content.value != '') {
                btn.disabled = false;
            }
        });
        content.addEventListener('blur', () => {
            if (content.value == '') {
                btn.disabled = true;
            }
        });

        // Main Listener
        btn.addEventListener('click', (e) => {

            e.preventDefault();

            // Message Content
            const contentSlug = string_to_slug(encodeURIComponent(content.value));

            // Fetch 
            fetch(url.value + `?content=${contentSlug}`, { 'credentiasls': 'include' }).then(response => {
                response.json().then((data) => {

                    // Message Create
                    var message = document.createElement('div');
                    message.classList.add('mine', 'mb-3');
                    message.innerHTML = '<small><i>Hace unos segundos</i></small><br>' + content.value;
                    document.querySelector('#thread').appendChild(message);

                    // Functions
                    scrollBtnInThread();
                    document.getElementById("message").value = '';
                    btn.disabled = true;

                    //Redirect
                    if (data.first) {
                        window.location.href = document.querySelector('#url_redirect').value;
                    }
                })
            })
        });

        // Functions/ Utilities
        function string_to_slug(str) {
            str = str.replace(/\s+/g, '%'); // blank spaces


            return str;
        }

        function scrollBtnInThread() {
            var thread = document.querySelector('#thread');
            thread.scrollTop = thread.scrollHeight;
        }

        scrollBtnInThread();
    })
})();