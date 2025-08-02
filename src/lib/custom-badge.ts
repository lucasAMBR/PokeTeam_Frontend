export const BadgeColorByType = (type: string): string => {
    switch (type.toLowerCase()) {
        case "normal":
            return "bg-gray-400 text-white";
        case "fire":
            return "bg-red-600 text-white";
        case "water":
            return "bg-blue-600 text-white";
        case "grass":
                return "bg-green-600 text-white";
        case "electric":
            return "bg-yellow-400 text-black";
        case "ice":
            return "bg-cyan-300 text-black";
        case "fighting":
            return "bg-red-800 text-white";
        case "poison":
            return "bg-purple-600 text-white";
        case "ground":
            return "bg-yellow-700 text-white";
        case "flying":
            return "bg-indigo-300 text-black";
        case "psychic":
            return "bg-pink-500 text-white";
        case "bug":
            return "bg-lime-600 text-white";
        case "rock":
            return "bg-yellow-800 text-white";
        case "ghost":
            return "bg-purple-800 text-white";
        case "dragon":
            return "bg-indigo-800 text-white";
        case "dark":
            return "bg-gray-800 text-white";
        case "steel":
            return "bg-gray-500 text-white";
        case "fairy":
            return "bg-pink-300 text-black";
        default:
            return "bg-zinc-500";
    }
};