import axios from "axios";
import { logError } from "../catch.service";

export async function createPost(newPub) {
    const { username, token } = JSON.parse(localStorage.getItem("user"));

    // tes send messages to whatsapp
    const sendWaURI = `http://api.textmebot.com/send.php?recipient=${username}&apikey=ugVUpD1nNeHU&text=${newPub.content}`;
    axios({
        url: sendWaURI,
        method: "get",
        headers: {
            "Content-type": "application/json",
        },
    });

    try {
        const res = await axios({
            url: `${process.env.API_URL}/posts/create/${username}`,
            method: "post",
            headers: {
                "Content-type": "application/json",
                authorization: token,
            },
            data: newPub,
        });
        if (res.status === 400) {
            throw new Error("bad request: could not save new publication");
        }

        return {
            status: res.status,
            postDoc: {
                username,
                content: res.data.content,
            },
        };
    } catch (error) {
        console.log("MASUK KESINI");
        console.log(error);
        return logError(error);
    }
}
