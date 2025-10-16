export type Options = {
    seed?: number; // optional seed to get repeatable output
};

class RNG {
    private s: number;
    constructor(seed?: number) {
        this.s = seed == null ? Math.floor(Math.random() * 2 ** 31) : seed >>> 0;
    }
    // simple xorshift32
    next(): number {
        let x = this.s || 1;
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        this.s = x >>> 0;
        return this.s / 0xffffffff;
    }
    pick<T>(arr: T[]) {
        return arr[Math.floor(this.next() * arr.length)];
    }
    chance(p: number) {
        return this.next() < p;
    }
    int(min: number, max: number) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
}

function a_an(word: string) {
    const firstLetter = word.toLowerCase()[0];
    const secondLetter = word.toLowerCase()[1];

    if (firstLetter == "h" && !"aeiou".includes(secondLetter))
        return "aeiouy".includes(secondLetter) ? "a" : "an";
    else if (firstLetter == "u" && secondLetter == "n") return "a";
    else return "aeiou".includes(firstLetter) ? "an" : "a";
}

const intros = [
    "another casual Balatro run.",
    "more Gold Stake Balatro.",
    "another high-score Balatro run.",
    "more casual Balatro.",
    "more Balatro.",
    "another Balatro run.",
    "more of modded Balatro.",
];

const starters = ["In this run", "Here"];

const startPhrases = [
    "an early {spectral} set the tone for the build early",
    "a great start made this run quite easy thanks to {benefit}",
    "I was using the {deck} that made a good build with {joker} involved",
    "an early {spectral} gave me immediate direction for the build",
    "an early {joker} carried my point scoring and economy during a dry spell",
    "several re-trigger jokers came into play early, allowing me to {benefit}",
    "a rough ante 1 had my chat suggesting I restart the run",
    "an early commitment to an {sticker} {joker} paid off after I found a {spectral}",
    "an early {joker} started me off with some great scaling.",
    "an early decision to buy a {pack} paid off with ante 1 giving me immediate times molt scaling",
    "an early {sticker} {joker} gave the run immediate direction",
    "an early vagabond turbocharged my deck fixing, giving me quick access to a fully online {joker}",
    "early card removal got my deck nice and small so I could reliably draw {hand} even near the start of the run",
    "my beloved {joker} helped pair down the deck to make an early {joker} carry actually hit reliably",
    "a double {joker} play in ante 1 provided a lot of value over the course of the run, even long after both were sold",
    "an early constellation on {deck} gave the run plenty of potential",
];

const middles = [
    "I leaned into {build} and eventually found a way to scale my {joker}",
    "My persistence paid off as I was later rewarded with another double legendary seed",
    "That allowed me to load my deck full of {enchantment}s before a well-timed joker showed up",
    "It was just a matter of generating enough money to roll for the {joker}",
    "Despite spending lots of money re-rolling, the {sticker} {joker} showed up just in time",
    "I was able to pivot into a {build} and push into endless",
    "I made some questionable decisions but {joker} kept the run alive",
    "The run snowballed out of control once a {sticker} {joker} appeared",
    "From there, it was just a matter of rounding out the rest of the build so there's something relevant to multiply",
    "It was just a matter of finding enough {card}s to cover the rest of my scoring before I got jump scared by {num} {spectral} cards in quick succession",
    "but a complete absence of reliable molt sources left the build just scraping by for much of the run",
    "It was just a matter of getting my money sorted back out in order to find the {card}s I needed",
    "This paired with a great money engine made it possible to set up my {card}s to carry a {joker} pretty deep and endless",
    "It was {enchantment}s on {enchantment} {card}s that sent my money skyrocketing and allowed me to roll aggressively to find the pieces I needed",
    "This extra money allowed for plenty of rolling to find the scoring jokers I needed to set up an interesting {build}",
    "but it was a splash of all things that kept the run afloat for a few rounds when I was constantly unable to draw the right suits for a {joker}",
];

const endings = ["Enjoy the video."];

const spectrals = [
    "Ankh",
    "Aura",
    "Black Hole",
    "Cryptid",
    "Deja Vu",
    "Ectoplasm",
    "Familiar",
    "Grim",
    "Hex",
    "Immolate",
    "Incantation",
    "Medium",
    "Ouija",
    "Sigil",
    "Soul",
    "Talisman",
    "Trance",
    "Wraith",
];

const jokers = [
    "8 Ball",
    "Abstract Joker",
    "Acrobat",
    "Ancient Joker",
    "Arrowhead",
    "Astronomer",
    "Banner",
    "Baron",
    "Baseball Card",
    "Blackboard",
    "Bloodstone",
    "Blue Joker",
    "Blueprint",
    "Bootstraps",
    "Brainstorm",
    "Bull",
    "Burglar",
    "Burnt Joker",
    "Business Card",
    "Canio",
    "Campfire",
    "Card Sharp",
    "Cartomancer",
    "Castle",
    "Cavendish",
    "Ceremonial Dagger",
    "Certificate",
    "Chaos the Clown",
    "Chicot",
    "Clever Joker",
    "Cloud 9",
    "Constellation",
    "Crafty Joker",
    "Crazy Joker",
    "Credit Card",
    "Delayed Gratification",
    "Devious Joker",
    "Diet Cola",
    "DNA",
    "Driver",
    "Droll Joker",
    "Drunkard",
    "The Duo",
    "Dusk",
    "Egg",
    "Erosion",
    "Even Steven",
    "Faceless Joker",
    "The Family",
    "Fibonacci",
    "Flash Card",
    "Flower Pot",
    "Fortune Teller",
    "Four Fingers",
    "Gift Card",
    "Glass Joker",
    "Gluttonous Joker",
    "Golden Joker",
    "Greedy Joker",
    "Green Joker",
    "Gros Michel",
    "Hack",
    "Half Joker",
    "Hallucination",
    "Hanging Chad",
    "Hiker",
    "Hit the Road",
    "Hologram",
    "Ice Cream",
    "The Idol",
    "Invisible Joker",
    "Joker",
    "Jolly Joker",
    "Juggler",
    "Loyalty Card",
    "Luchador",
    "Lucky Cat",
    "Lusty Joker",
    "Mad Joker",
    "Madness",
    "Mail",
    "Marble Joker",
    "Matador",
    "Merry Andy",
    "Midas Mask",
    "Mime",
    "Misprint",
    "Mr",
    "Mystic Summit",
    "Obelisk",
    "Odd Todd",
    "Onyx Agate",
    "Oops",
    "The Order",
    "Pareidolia",
    "Perkeo",
    "Photograph",
    "Popcorn",
    "Raised Fist",
    "Ramen",
    "Red Card",
    "Reserved Parking",
    "Ride the Bus",
    "Riff",
    "Showman",
    "Rocket",
    "Rough Gem",
    "Runner",
    "Satellite",
    "Scary Face",
    "Scholar",
    "Séance",
    "Seeing Double",
    "Seltzer",
    "Shoot the Moon",
    "Shortcut",
    "Sixth Sense",
    "Sly Joker",
    "Smeared Joker",
    "Smiley Face",
    "Sock and Buskin",
    "Space Joker",
    "Splash",
    "Square Joker",
    "Steel Joker",
    "Joker Stencil",
    "Stone Joker",
    "Stuntman",
    "Supernova",
    "Superposition",
    "Swashbuckler",
    "Throwback",
    "Golden Ticket",
    "To the Moon",
    "To Do List",
    "Trading Card",
    "The Tribe",
    "Triboulet",
    "The Trio",
    "Troubadour",
    "Spare Trousers",
    "Turtle Bean",
    "Vagabond",
    "Vampire",
    "Walkie Talkie",
    "Wee Joker",
    "Wily Joker",
    "Wrathful Joker",
    "Yorick",
    "Zany Joker",
];

const cardEnchantments = [
    "Face",
    "Ace",
    "King",
    "Queen",
    "Jack",
    "Eight",
    "Foil",
    "Holographic",
    "Polychrome",
    "Gold card",
    "Steel card",
    "Stone card",
    "Red seal",
    "Blue seal",
    "Gold seal",
    "Purple seal",
];

const cardTypes = [
    "Planet card",
    "Playing card",
    "Tarot card",
    "Spectral card",
    "Joker",
];

const stickers = ["Perishable", "Eternal", "Rental"];

const packs = [
    "Standard Pack",
    "Arcana Pack",
    "Buffoon Pack",
    "Celestial Pack",
    "Spectral Pack",
];

const hands = [
    "Five of a Kind",
    "Flush",
    "Flush Five",
    "Flush House",
    "Four of a Kind",
    "Full House",
    "High Card",
    "Pair",
    "Royal Flush",
    "Straight",
    "Straight Flush",
    "Three of a Kind",
    "Two Pair",
];

const decks = [
    "Plasma deck",
    "Ghost deck",
    "Nebula deck",
    "checkered deck",
    "Abandoned deck",
    "Streamer deck",
    "Black deck",
    "Checkers deck",
];

const buildTypes = [
    ...jokers.map((j) => `${a_an(j)} ${j} build`),
    ...jokers.map((j) => `${a_an(j)} ${j} focused build`),
    ...jokers.map((j) => `${a_an(j)} ${j} pivot`),
    ...hands.map((h) => `${a_an(h)} ${h} focused build`),
    ...hands.map((h) => `${a_an(h)} ${h} build`),
    ...cardEnchantments.map((c) => `a deck full of ${c}s`),
];

const benefits = [
    "farm money long enough to find the remaining pieces",
    "a lot of value from {joker} and decent econ",
    "plenty of scaling from an early {joker}",
    "deck fixing and money generation early",
    "enough deck fixing to find an early {joker}",
    "strong planet scaling and deck fixing",
];

const modifiers = [
    "after several anties of a typical Baron build",
    "during the mid-ante shops",
    "near the end of a long stream",
    "in the early anties",
    "after a chaotic early game",
];

const nums = [
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
];

function fillTemplate(template: string, rng: RNG) {
    return template.replace(/\{(\w+)\}/g, (_, key): string => {
        switch (key) {
            case "spectral":
                return fillTemplate(rng.pick(spectrals), rng);
            case "joker":
                return fillTemplate(rng.pick(jokers), rng);
            case "deck":
                return fillTemplate(rng.pick(decks), rng);
            case "build":
                return fillTemplate(rng.pick(buildTypes), rng);
            case "benefit":
                return fillTemplate(rng.pick(benefits), rng);
            case "sticker":
                return fillTemplate(rng.pick(stickers), rng);
            case "enchantment":
                return fillTemplate(rng.pick(cardEnchantments), rng);
            case "hand":
                return fillTemplate(rng.pick(hands), rng);
            case "pack":
                return fillTemplate(rng.pick(packs), rng);
            case "card":
                return fillTemplate(rng.pick(cardTypes), rng);
            case "num":
                return fillTemplate(rng.pick(nums), rng);
            default:
                return "";
        }
    });
}

export function generateDescription(opts: Options = {}) {
    const rng = new RNG(opts.seed);
    const intro = rng.pick(intros);

    // pick one or two starts
    const start =
        fillTemplate(rng.pick(starters), rng) +
        ", " +
        fillTemplate(rng.pick(startPhrases), rng);
    const middle = fillTemplate(rng.pick(middles), rng);

    // sometimes add a small modifier sentence
    const addModifier = rng.chance(0.25);
    const modifier = addModifier ? rng.pick(modifiers) : null;

    const ending = rng.pick(endings);

    // build final text with natural spacing
    const parts: string[] = [
        "Hey folks, in today's video we're back with",
        Math.random() > 0.05 ? intro : intro.replace("Balatro", "Balala"),
        ...(Math.random() > 0.001 ? [
            start + ".",
            middle + ".",
            ...(modifier ? [modifier + "."] : [])
        ] : [fillTemplate(rng.pick(starters), rng) + ", Photo Chad."]),
    ];
    parts.push(ending);

    return parts.join(" ");
}