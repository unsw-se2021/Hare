const startDemo = (imgurl) => {
        const productPage = {
                product_id: "000000000000000000000000",
                img_url: imgurl,
                contents: {
                        Sugar: [
                                {
                                        name: "Glucose Syrup",
                                        desc: "Glucose syrup, also known as confectioner's glucose, is a syrup made from the hydrolysis of starch. Glucose is a sugar. Maize (corn) is commonly used as the source of the starch in the US, in which case the syrup is called 'corn syrup'. Glucose syrup containing over 90% glucose is used in industrial fermentation, but syrups used in confectionery contain varying amounts of glucose, maltose and higher oligosaccharides, depending on the grade, and can typically contain 10% to 43% glucose.",
                                }
                        ],
                        Cereals: [

                        ],
                        Fats_Or_Oils: [
                                {
                                        name: "Cocoa Butter",
                                        desc: "Cocoa butter, also called theobroma oil, is a pale-yellow, edible vegetable fat extracted from the cocoa bean. It is used to make chocolate, as well as some ointments, toiletries, and pharmaceuticals. Cocoa butter has a cocoa flavor and aroma. Its melting point is just below human body temperature.. Cocoa butter contains a high proportion of saturated fats as well as monounsaturated oleic acid, which typically occurs in each triglyceride. The predominant triglycerides are POS, SOS, POP, where P = palmitic, O = oleic, and S = stearic acid residues."
                                },
                                {
                                        name: "Vegetable Oil",
                                        desc: "Vegetable oils, or vegetable fats, are fats extracted from seeds, or less often, from other parts of fruits. Like animal fats, vegetable fats are mixtures of triglycerides. Soybean oil, rapeseed oil, and cocoa butter are examples of fats from seeds. Olive oil, palm oil, and rice bran oil are example of fats from other parts of fruits. In common usage, vegetable oil may refer exclusively to vegetable fats which are liquid at room temperature."
                                },

                        ],
                        Fish: [

                        ],
                        Dairy: [
                                {
                                        name: "Milk Solids",
                                        desc: "Powdered milk or dried milk is a manufactured dairy product made by evaporating milk to dryness. One purpose of drying milk is to preserve it; milk powder has a far longer shelf life than liquid milk and does not need to be refrigerated, due to its low moisture content. Another purpose is to reduce its bulk for economy of transportation. Powdered milk and dairy products include such items as dry whole milk, nonfat (skimmed) dry milk, dry buttermilk, dry whey products and dry dairy blends"
                                 }
                        ],
                        Nuts: [
                                {
                                        name: "Peanuts",
                                        desc: "The peanut, also known as the groundnut, is a legume crop grown mainly for its edible seeds. Peanuts are similar in taste and nutritional profile to tree nuts, such as walnuts and almonds, and as a culinary nut are often served in similar ways in Western cuisines. Peanuts are rich in essential nutrients  In a 100 g serving, peanuts provide 570 calories and are an excellent source (defined as more than 20% of the Daily Value, DV) of several B vitamins, vitamin E, several dietary minerals, such as manganese (95% DV), magnesium (52% DV) and phosphorus (48% DV), and dietary fiber (right table). They also contain about 25 g protein per 100 g serving, a higher proportion than in many tree nuts."
                                },
                        ],
                        Starch: [

                        ],
                        Flavouring: [
                                {
                                        name: "Salt",
                                        desc: "Salt is a mineral composed primarily of sodium chloride (NaCl), a chemical compound belonging to the larger class of salts; salt in its natural form as a crystalline mineral is known as rock salt or halite. Salt is present in vast quantities in seawater, where it is the main mineral constituent. The open ocean has about 35 grams (1.2 oz) of solids per liter of sea water, a salinity of 3.5%. Salt is essential for life in general, and saltiness is one of the basic human tastes. Salt is one of the oldest and most ubiquitous food seasonings, and salting is an important method of food preservation."
                                },
                        ],
                        Compound_Ingredients: [
                                {
                                        name: "Cocoa Solids",
                                        desc: "Cocoa solids are all solid constituents of cocoa beans, including cocoa butter, a group of lipids that remain solid at room temperature. Cocoa solids are a key ingredient of chocolate, chocolate syrup, and chocolate confections. Cocoa solids comprise both Cocoa liquor and cocoa mass. Cocoa products may contain cadmium, a toxic heavy metal and probable carcinogen. The European Union has imposed a limit (starting on 1 January 2019) for cadmium in cocoa powders of 0.6 µg per gram of cocoa powder, and 0.8 µg per gram for chocolate with >= 50% total dry cocoa solids."
                                 },
                        ],
                        Alternative_Food_Additives: [
                                {
                                        name: "Soy Letchin",
                                        desc: "Lecithin is a generic term to designate any group of yellow-brownish fatty substances occurring in animal and plant tissues, which are amphiphilic – they attract both water and fatty substances, and are used for smoothing food textures, emulsifying, homogenizing liquid mixtures, and repelling sticking materials. In confectionery, it reduces viscosity, replaces more expensive ingredients, controls sugar crystallization and the flow properties of chocolate, helps in the homogeneous mixing of ingredients, improves shelf life for some products, and can be used as a coating. In emulsions and fat spreads, such as margarines with a high fat content of more than 75%, it stabilizes emulsions, reduces spattering during frying, improves texture of spreads and flavor release.",
                                },
                                {
                                        name: "Egg White",
                                        desc: "Egg white is the clear liquid (also called the albumen or the glair/glaire) contained within an egg. In chickens it is formed from the layers of secretions of the anterior section of the hen's oviduct during the passage of the egg. It forms around fertilized or unfertilized egg yolks. The primary natural purpose of egg white is to protect the yolk and provide additional nutrition for the growth of the embryo (when fertilized). Egg white consists primarily of about 90% water into which about 10% proteins (including albumins, mucoproteins, and globulins) are dissolved."
                                },
                        ], Not_Readable: [
                                {
                                        name: "Flavour",
                                        reason: "Ingredient not identified"
                                }
                        ],
                }
        }

        const userPrefs = {
                default: false,
                categories: [
                ],
                special: [
                        {
                                name: "Peanuts" ,
                                color: "1",
                        },
                        {
                                name: "Peanut Butter",
                                color: "1",
                          },
                ]
        }

        const userData = {
                uid: "95060000000000000000",
                username: "John",
                password: "5caab8540000000000000000",
                preferences: userPrefs,
                products: [
                        "000000000000000000000000",
                ]
        }


        localStorage.setItem('userdata', JSON.stringify(userData));
        localStorage.setItem('000000000000000000000000', JSON.stringify(productPage));
        console.log(productPage);
        return productPage;
}

export default startDemo;


                                        

