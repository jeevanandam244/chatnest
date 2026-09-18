
// CHATNEST JAVASCRIPT
// 


// DEFAULT CHAT DATA

const defaultChats = [

    {
        id: 1,

        name: "Aarav",

        avatar: "A",

        status: "Online",

        messages: [

            {
                text: "Hey! Welcome to ChatNest 👋",

                mine: false,

                time: "10:20 AM"
            },

            {
                text: "Hi Aarav! Nice to meet you.",

                mine: true,

                time: "10:21 AM"
            },

            {
                text: "How is your project going?",

                mine: false,

                time: "10:22 AM"
            }

        ]
    },


    {
        id: 2,

        name: "Priya",

        avatar: "P",

        status: "Online",

        messages: [

            {
                text: "Don't forget our meeting today.",

                mine: false,

                time: "09:45 AM"
            },

            {
                text: "Sure! I will be there.",

                mine: true,

                time: "09:50 AM"
            }

        ]
    },


    {
        id: 3,

        name: "Rahul",

        avatar: "R",

        status: "Last seen recently",

        messages: [

            {
                text: "Can you send me the notes?",

                mine: false,

                time: "Yesterday"
            }

        ]
    },


    {
        id: 4,

        name: "Project Group",

        avatar: "G",

        status: "5 members",

        messages: [

            {
                text: "Welcome everyone to the project group! 🎉",

                mine: false,

                time: "Yesterday"
            }

        ]
    }

];


// LOAD DATA FROM LOCAL STORAGE

let chats =
    JSON.parse(
        localStorage.getItem("chatNestChats")
    ) || defaultChats;


// ACTIVE CHAT

let activeChatId = chats[0].id;


// ELEMENTS

const chatList =
    document.getElementById("chatList");

const messageArea =
    document.getElementById("messageArea");

const messageInput =
    document.getElementById("messageInput");

const messageForm =
    document.getElementById("messageForm");

const headerName =
    document.getElementById("headerName");

const headerAvatar =
    document.getElementById("headerAvatar");

const headerStatus =
    document.getElementById("headerStatus");

const searchInput =
    document.getElementById("searchInput");

const typing =
    document.getElementById("typing");

const toast =
    document.getElementById("toast");


// ==========================================
// SAVE CHAT DATA
// ==========================================

function saveChats() {

    localStorage.setItem(
        "chatNestChats",
        JSON.stringify(chats)
    );

}


// ==========================================
// GET CURRENT CHAT
// ==========================================

function getCurrentChat() {

    return chats.find(
        chat => chat.id === activeChatId
    );

}


// ==========================================
// DISPLAY CHAT LIST
// ==========================================

function displayChats(filter = "") {

    chatList.innerHTML = "";


    chats
        .filter(chat =>
            chat.name
                .toLowerCase()
                .includes(
                    filter.toLowerCase()
                )
        )

        .forEach(chat => {

            const item =
                document.createElement("div");


            item.className =
                "chat-item";


            if (chat.id === activeChatId) {

                item.classList.add("active");

            }


            const lastMessage =
                chat.messages[
                    chat.messages.length - 1
                ];


            item.innerHTML = `

                <div class="avatar">
                    ${chat.avatar}
                </div>

                <div class="chat-info">

                    <strong>
                        ${escapeHTML(chat.name)}
                    </strong>

                    <p>
                        ${
                            lastMessage
                            ? escapeHTML(
                                lastMessage.text
                            )
                            : "No messages"
                        }
                    </p>

                </div>

                <span class="chat-time">

                    ${
                        lastMessage
                        ? escapeHTML(
                            lastMessage.time
                        )
                        : ""
                    }

                </span>

            `;


            item.addEventListener(
                "click",
                function() {

                    activeChatId =
                        chat.id;

                    displayChats(
                        searchInput.value
                    );

                    displayMessages();

                }
            );


            chatList.appendChild(item);

        });

}


// ==========================================
// DISPLAY MESSAGES
// ==========================================

function displayMessages() {

    const chat =
        getCurrentChat();


    if (!chat) return;


    headerName.textContent =
        chat.name;


    headerAvatar.textContent =
        chat.avatar;


    headerStatus.textContent =
        "🟢 " + chat.status;


    messageArea.innerHTML = `

        <div class="date">
            Today
        </div>

    `;


    chat.messages.forEach(message => {

        const row =
            document.createElement("div");


        row.className =
            "message-row";


        if (message.mine) {

            row.classList.add("mine");

        }


        row.innerHTML = `

            <div class="message">

                ${escapeHTML(message.text)}

                <span class="message-time">

                    ${escapeHTML(message.time)}

                    ${message.mine ? " ✓✓" : ""}

                </span>

            </div>

        `;


        messageArea.appendChild(row);

    });


    messageArea.scrollTop =
        messageArea.scrollHeight;

}


// ==========================================
// SEND MESSAGE
// ==========================================

function sendMessage(text) {

    text = text.trim();


    if (text === "") {

        showToast(
            "Please type a message."
        );

        return;

    }


    const chat =
        getCurrentChat();


    const time =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    chat.messages.push({

        text: text,

        mine: true,

        time: time

    });


    saveChats();

    displayChats(
        searchInput.value
    );

    displayMessages();


    messageInput.value = "";


    // BOT REPLY

    botReply(text);

}


// ==========================================
// BOT REPLY
// ==========================================

function botReply(userMessage) {

    typing.classList.add("show");


    setTimeout(function() {

        const chat =
            getCurrentChat();


        let reply;


        const message =
            userMessage.toLowerCase();


        if (
            message.includes("hello") ||
            message.includes("hi")
        ) {

            reply =
                "Hello! 😊 Nice to chat with you.";

        }

        else if (
            message.includes("how are you")
        ) {

            reply =
                "I'm doing great! Thanks for asking. 😄";

        }

        else if (
            message.includes("project")
        ) {

            reply =
                "ChatNest is a JavaScript chat application. 🚀";

        }

        else if (
            message.includes("thank")
        ) {

            reply =
                "You're welcome! 😊";

        }

        else if (
            message.includes("bye")
        ) {

            reply =
                "Goodbye! Have a great day! 👋";

        }

        else {

            reply =
                "That's interesting! Tell me more. 😊";

        }


        const time =
            new Date().toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );


        chat.messages.push({

            text: reply,

            mine: false,

            time: time

        });


        typing.classList.remove("show");


        saveChats();

        displayChats(
            searchInput.value
        );

        displayMessages();


    }, 900);

}


// ==========================================
// CREATE NEW CHAT
// ==========================================

function createNewChat() {

    const name =
        prompt(
            "Enter contact name:"
        );


    if (
        !name ||
        name.trim() === ""
    ) {

        return;

    }


    const newChat = {

        id: Date.now(),

        name: name.trim(),

        avatar:
            name
                .trim()
                .charAt(0)
                .toUpperCase(),

        status: "Online",

        messages: [

            {
                text:
                    `Hi ${name.trim()}! 👋`,

                mine: false,

                time: "Now"
            }

        ]

    };


    chats.unshift(
        newChat
    );


    activeChatId =
        newChat.id;


    saveChats();

    displayChats();

    displayMessages();


    showToast(
        "New chat created!"
    );

}


// ==========================================
// SEARCH CHAT
// ==========================================

searchInput.addEventListener(
    "input",
    function() {

        displayChats(
            searchInput.value
        );

    }
);


// ==========================================
// MESSAGE FORM
// ==========================================

messageForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        sendMessage(
            messageInput.value
        );

    }
);


// ==========================================
// EMOJI BUTTON
// ==========================================

document
    .getElementById("emojiBtn")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "emojiPanel"
                )
                .classList.toggle(
                    "show"
                );

        }
    );


// ==========================================
// EMOJI SELECTION
// ==========================================

document
    .getElementById("emojiPanel")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                event.currentTarget
            ) {
                return;
            }


            const emoji =
                event.target.textContent.trim();


            messageInput.value +=
                emoji;


            messageInput.focus();

        }
    );


// ==========================================
// NEW CHAT BUTTON
// ==========================================

document
    .getElementById("newChatBtn")
    .addEventListener(
        "click",
        createNewChat
    );


// ==========================================
// DARK MODE
// ==========================================

document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        function() {

            document.body
                .classList
                .toggle("dark");


            const mode =
                document.body
                    .classList
                    .contains("dark")
                    ? "dark"
                    : "light";


            localStorage.setItem(
                "chatNestTheme",
                mode
            );

        }
    );


// ==========================================
// LOAD THEME
// ==========================================

const savedTheme =
    localStorage.getItem(
        "chatNestTheme"
    );


if (savedTheme === "dark") {

    document.body
        .classList
        .add("dark");

}


// ==========================================
// FILE ATTACHMENT
// ==========================================

document
    .getElementById("fileInput")
    .addEventListener(
        "change",
        function(event) {

            const file =
                event.target.files[0];


            if (file) {

                showToast(
                    "Selected: " +
                    file.name
                );

            }

        }
    );


// ==========================================
// SEARCH BUTTON
// ==========================================

document
    .getElementById("searchBtn")
    .addEventListener(
        "click",
        function() {

            searchInput.focus();

            showToast(
                "Search your chats"
            );

        }
    );


// ==========================================
// MORE BUTTON
// ==========================================

document
    .getElementById("moreBtn")
    .addEventListener(
        "click",
        function() {

            showToast(
                "More chat options"
            );

        }
    );


// ==========================================
// TOAST MESSAGE
// ==========================================

function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        1800
    );

}


// ==========================================
// SECURITY FUNCTION
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value;


    return div.innerHTML;

}


// ==========================================
// START APPLICATION
// ==========================================

displayChats();

displayMessages();

