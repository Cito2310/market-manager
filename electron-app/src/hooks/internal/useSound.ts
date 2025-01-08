const dictionary = {
    error: "/error-sound.wav",
    "add-product": "/add-product-sound.mp3"
}

export const useSound = (sound: "error" | "add-product") => {
    const audio = new Audio(dictionary[sound]);
    return () => {audio.play()}
}