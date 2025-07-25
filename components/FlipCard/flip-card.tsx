import { cn } from "@/lib/utils";
import Image from "next/image";

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
    image: string;
    title: string;
    description: string[];
    rotate?: "x" | "y";
}

export default function FlipCard({
    image,
    title,
    description,
    rotate = "y",
    className,
    ...props
}: FlipCardProps) {
    const rotationClass = {
        x: ["group-hover:[transform:rotateX(180deg)]", "[transform:rotateX(180deg)]"],
        y: ["group-hover:[transform:rotateY(180deg)]", "[transform:rotateY(180deg)]"],
    };
    const self = rotationClass[rotate];

    return (
        <div className={cn("group h-[300px] w-full p-[10px] [perspective:1000px]", className)} {...props}>
            <div
                className={cn(
                    "relative h-full rounded-2xl transition-all duration-500 [transform-style:preserve-3d]",
                    self[0],
                )}
            >
                {/* Front */}
                <div className="absolute z-10 flex-1 h-full w-full box-border [backface-visibility:hidden]">
                    <Image
                        src={image}
                        alt={title} width={400} height={400}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-[10px]"
                    />
                </div>


                {/* Back */}
                <div
                    className={cn(
                        "absolute h-full w-full p-[10px] rounded-2xl bg-black/80 text-slate-200 [backface-visibility:hidden]",
                        self[1],
                    )}
                >
                    <div className="flex min-h-full flex-col gap-2">
                       {/*  <h1 className="text-xl font-bold text-white">{subtitle}</h1> */}
                        {/*  <p className="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100">
              {description}{" "}
            </p> */}
                        <ul className=" py-4 text-sm font-medium  text-gray-100 list-disc list-inside space-y-1">
                            {description.map((point: string, i: number) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
