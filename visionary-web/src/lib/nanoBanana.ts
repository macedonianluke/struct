export interface Property {
    id: number;
    title: string;
    location: string;
    price: string;
    beforeImage: string;
    afterImage: string;
    meta: string;
}

export const properties: Property[] = [
    {
        id: 1,
        title: "Victorian Preservation",
        location: "Carlton, VIC",
        price: "$1.4M - $1.6M",
        beforeImage: "/terrace_house_before_1768693729936.png",
        afterImage: "/terrace_house_after_v2_1768693859721.png",
        meta: "4 BEDS | 2 BATH | HERITAGE"
    },
    {
        id: 2,
        title: "The Concrete Loft",
        location: "Abbotsford, VIC",
        price: "$790K - $850K",
        beforeImage: "/loft_before_1768693771516.png",
        afterImage: "/loft_after_v2_1768693883925.png",
        meta: "2 BEDS | 1 BATH | INDUSTRIAL"
    },
    {
        id: 3,
        title: "70s Brick Potential",
        location: "Reservoir, VIC",
        price: "$820K - $880K",
        beforeImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        meta: "3 BEDS | 1 BATH | LARGE BLOCK"
    }
];

const DEVELOPER_CONFIG = {
    apiKey: "AI_SESSION_DEV_KEY_HIDDEN",
    prePrompt: `act like a world class interior decorate and architect that buys an old house and dos it up to make it have maximum draw for an australian family who would want to buy the house. improve and update the image with landscape and painting and decoration, keep all the same architectural features.`
};

export class NanoBananaService {
    static async generateVision(listingUrl: string): Promise<{ success: boolean; message: string; structuralIntegrityScore: number }> {
        console.group("Nano Banana API Session (Background Auth)");
        console.log(`Endpoint: /api/v1/vision/architectural-edit`);
        console.log(`Developer Credential: ${DEVELOPER_CONFIG.apiKey}`);
        console.log(`Executing Pre-Prompt: ${DEVELOPER_CONFIG.prePrompt}`);
        console.log(`Input Listing: ${listingUrl}`);
        console.groupEnd();

        // Simulate architectural processing & grounding
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: "VISION_READY",
                    structuralIntegrityScore: 0.99
                });
            }, 2500);
        });
    }
}
