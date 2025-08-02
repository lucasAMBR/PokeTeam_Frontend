import { Pokemon } from "@/types/pokemon";
import { Card, CardContent, CardHeader } from "./card";
import { capitalizeFirstLetter } from "@/lib/text";
import Image from "next/image";
import { Badge } from "./badge";
import { BadgeColorByType } from "@/lib/custom-badge";

type PokeCardInfos = Omit<Pokemon, 'team_id' | 'created_at' | 'updated_at'>

export default function PokemonCard(infos: PokeCardInfos){
    return(
        <Card className="flex-1 m-1 flex text-center md:min-w-[300px] transition-transform duration-300 hover:bg-gray-100 dark:hover:bg-zinc-900 hover:scale-105">
            <CardHeader className="text-xl font-semibold">
                {capitalizeFirstLetter(infos.name)}
            </CardHeader>
            <div className="flex justify-center">
                <div className="bg-stone-600 p-4 rounded-full w-[100px] h-[100px] flex justify-center items-center">
                    <Image width={80} height={80} alt="pokemon" src={infos.image_url} />
                </div>
            </div>
            <CardContent>
                {JSON.parse(infos.types).map((type: string, index : number)=>(
                    <Badge key={index} variant="secondary" className={`${BadgeColorByType(type)} m-1 px-4 py-1`}>{capitalizeFirstLetter(type)}</Badge>
                ))}
            </CardContent>
        </Card>
    )
}