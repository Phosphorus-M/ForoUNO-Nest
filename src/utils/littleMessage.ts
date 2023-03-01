
export function cutMessage(message: (string | null)): (string | null) {
    if (message && message.length > 280) {
        return message.substring(0, 276) + "...";
    }
    return message;
}
