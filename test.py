counter = 0
with open("colleges.txt", "r") as file:
    for line in file:
        if counter % 20 == 0:
            print(f"{{\"prompt\": \"{line[:-6]} \", \"completion\": \"!Yes,Credit,Education!###\"}}")
        counter += 1

with open("states.txt") as file1:
    for line in file1:
        print(f"{{\"prompt\": \"{line.rstrip()} \", \"completion\": \"!Yes,Deduction,Taxes!###\"}}")

test = """
Amazon
Walmart
Target
Costco
Kroger
Walgreens
CVS Health
Macy's
Home Depot
Lowe's
Best Buy
Kohl's
J.C. Penney
Nordstrom
Gap
Old Navy
Banana Republic
Victoria's Secret
Bath & Body Works
Sephora
Ulta Beauty
Zara
H&M
Forever 21
American Eagle Outfitters
Abercrombie & Fitch
Hollister Co.
Adidas
Nike
Puma
Reebok
Under Armour
Foot Locker
Finish Line
Skechers
Payless ShoeSource
DSW
The Children's Place
Toys "R" Us
GameStop
Barnes & Noble
Books-A-Million
Staples
Office Depot
OfficeMax
Michaels
Jo-Ann Stores
Party City
Pier 1 Imports
Bed Bath & Beyond
Crate & Barrel
Pottery Barn
West Elm
Williams-Sonoma
IKEA
TJ Maxx
Marshalls
Ross Stores
Burlington
Dollar Tree
Dollar General
Family Dollar
7-Eleven
Circle K
Speedway
Casey's General Store
Wawa
Sheetz
ExxonMobil
Chevron
BP
Shell
Costco Gasoline
Sam's Club Gasoline
McDonald's
Burger King
Wendy's
Taco Bell
KFC
Subway
Domino's Pizza
Papa John's Pizza
Pizza Hut
Starbucks
Dunkin' Donuts
Krispy Kreme
Ben & Jerry's
Baskin-Robbins
Dairy Queen
Cold Stone Creamery
Jamba Juice
Smoothie King
Orange Julius
Red Robin
Chili's
T.G.I. Friday's
Olive Garden
Outback Steakhouse
Red Lobster
Applebee's
IHOP
Denny's
Cracker Barrel
Ruby Tuesday
Buffalo Wild Wings
Hooters
Wingstop
Papa Murphy's
Little Caesars
Chuck E. Cheese
Dave & Buster's
AMC Theatres
Regal Cinemas
Cinemark Theatres
Harkins Theatres
Fandango
Ticketmaster
StubHub
Live Nation
AXS
Ticketfly
Ticketweb
Eventbrite
Meetup
Airbnb
VRBO
HomeAway
Booking.com
Expedia
Orbitz
Priceline
Travelocity
Kayak
Hotwire
"""

for i, line in enumerate(test.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!No!###"}}')

test2 = """
McDonald's
Subway
KFC
Burger King
Pizza Hut
Domino's Pizza
Papa John's Pizza
Wendy's
Taco Bell
Dunkin' Donuts
Starbucks
Tim Hortons
Chipotle Mexican Grill
Panera Bread
Jimmy John's
Arby's
Five Guys
In-N-Out Burger
Shake Shack
Chick-fil-A
Raising Cane's Chicken Fingers
Zaxby's
Dairy Queen
Sonic Drive-In
Steak 'n Shake
Hardee's
Carl's Jr.
Long John Silver's
White Castle
Baskin-Robbins
Cold Stone Creamery
Ben & Jerry's
The Cheesecake Factory
Olive Garden
Red Lobster
Outback Steakhouse
Texas Roadhouse
Chili's
T.G.I. Friday's
Applebee's
Buffalo Wild Wings
Hooters
Wingstop
PF Chang's
Carrabba's Italian Grill
Red Robin
Cracker Barrel
Denny's
IHOP
Waffle House
Bob Evans
Golden Corral
Fogo de Chão Brazilian Steakhouse
Ruth's Chris Steak House
Morton's The Steakhouse
The Capital Grille
Maggiano's Little Italy
Buca di Beppo
Olive & Ivy
The Melting Pot
P.F. Chang's
Brio Tuscan Grille
Seasons 52
The Cheesecake Factory
California Pizza Kitchen
BJ's Restaurant & Brewhouse
The Old Spaghetti Factory
Rainforest Cafe
Hard Rock Cafe
Planet Hollywood
Yard House
The Tilted Kilt
Medieval Times
The Rainforest Cafe
Joe's Crab Shack
Red Lobster
Bonefish Grill
Fleming's Prime Steakhouse & Wine Bar
Carrabba's Italian Grill
Olive Garden
Maggiano's Little Italy
Bravo Cucina Italiana
Buca di Beppo
On The Border
Pappasito's Cantina
El Torito
Chevy's Fresh Mex
Chuy's
Baja Fresh
Qdoba Mexican Grill
Moe's Southwest Grill
Rubio's Coastal Grill
Tijuana Flats
Fuzzy's Taco Shop
Taco Bueno
Taco Cabana
El Pollo Loco
Church's Chicken
Popeyes Louisiana Kitchen
Bojangles
"""

for i, line in enumerate(test2.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!No!###"}}')

online = """
PayPal
Venmo
Cash App
Zelle
Google Pay
Apple Pay
Stripe
Square
Skrill
TransferWise
"""

for i, line in enumerate(online.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!No!###"}}')

test3 = """
Disney
Warner Bros.
NBCUniversal
Sony Pictures
Paramount Pictures
20th Century Studios
Lionsgate
DreamWorks Animation
MGM Studios
Marvel Studios
Lucasfilm
Pixar
Universal Studios
HBO
Netflix
Amazon Studios
Hulu
Apple TV+
CBS Studios
ABC Studios
NBC Studios
Fox Studios
The CW
BBC
ITV Studios
Sky
Endemol Shine Group
Fremantle
MGM Television
A&E Networks
AMC Networks
Discovery Inc.
ViacomCBS
The Walt Disney Company
Comcast Corporation
Time Warner
AT&T
Sony Corporation
NBC
CBS
Fox
Time Warner Cable
Comcast Cable
Amazon
Google
Facebook
Twitter
Snapchat
TikTok
Instagram
YouTube
Vimeo
Vevo
SoundCloud
Pandora
iHeartRadio
SiriusXM
Live Nation
AEG Worldwide
Ticketmaster
StubHub
Goldenvoice
Electric Daisy Carnival (EDC)
Ultra Music Festival
Coachella
Lollapalooza
Bonnaroo
South by Southwest (SXSW)
New York Comic Con
San Diego Comic-Con
Wizard World
ReedPOP
The Walking Dead Experience
Escape Room LA
Universal Studios Hollywood
Disneyland Resort
Walt Disney World Resort
Six Flags
Cedar Fair Entertainment Company
SeaWorld Parks & Entertainment
Busch Gardens
LEGOLAND Parks
Hershey Entertainment & Resorts
Dollywood
Knott's Berry Farm
Silver Dollar City
Holiday World & Splashin' Safari
Disney Cruise Line
Royal Caribbean International
Carnival Cruise Line
Norwegian Cruise Line
Celebrity Cruises
Cirque du Soleil
Blue Man Group
Broadway Across America
The Metropolitan Opera
American Ballet Theatre
New York City Ballet
The Second City
The Upright Citizens Brigade Theatre
"""

for i, line in enumerate(test3.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!No!###"}}')

banks = """
ABN Amro
Agricultural Bank of China
Allied Irish Banks
Australia and New Zealand Banking Group (ANZ)
Banco Bradesco
Banco do Brasil
Banco Santander
Bangkok Bank
Bank of America
Bank of China
Bank of Communications
Bank of East Asia
Bank of India
Bank of Ireland
Bank of Montreal
Bank of New York Mellon
Bank of Nova Scotia (Scotiabank)
Bank of the Philippine Islands (BPI)
Bank of Tokyo-Mitsubishi UFJ
Barclays Bank
BBVA
BNP Paribas
Canadian Imperial Bank of Commerce (CIBC)
China Construction Bank
Citibank
Commonwealth Bank of Australia
Credit Agricole
Credit Suisse
Danske Bank
DBS Bank
Deutsche Bank
DNB
Fifth Third Bank
First Abu Dhabi Bank
FirstRand Bank
Goldman Sachs
Hang Seng Bank
HDFC Bank
HSBC
Industrial and Commercial Bank of China (ICBC)
ING Group
Intesa Sanpaolo
Itau Unibanco
JPMorgan Chase
KBC Bank
KEB Hana Bank
KeyBank
Kookmin Bank
Lloyds Bank
Macquarie Bank
Mashreq Bank
Mizuho Bank
Mitsubishi UFJ Financial Group
Morgan Stanley
National Australia Bank (NAB)
Natixis
Nedbank
Nomura Holdings
Nordea Bank
OCBC Bank
Oversea-Chinese Banking Corporation
PNC Financial Services
Qatar National Bank
RBC Royal Bank
Regions Financial Corporation
Royal Bank of Scotland
Samba Financial Group
Santander UK
Shinhan Bank
Societe Generale
Standard Bank
Standard Chartered Bank
State Bank of India
Sumitomo Mitsui Financial Group
Svenska Handelsbanken
Swedbank
TD Bank
The Bank of Tokyo-Mitsubishi UFJ
The Hongkong and Shanghai Banking Corporation (HSBC)
The Toronto-Dominion Bank (TD Bank)
UBS
Unicredit
United Overseas Bank
US Bancorp
Wells Fargo
Westpac Banking Corporation
Woori Bank
Yes Bank
Zenith Bank
Agricultural Development Bank of China
Banca Popolare di Sondrio
Bank of Jiangsu
Bank of Shaanxi
Guangzhou Rural Commercial Bank
Industrial Bank of Korea
Land Bank of Taiwan
Meituan Dianping
Mizrahi Tefahot Bank
Ping An Bank
Qingdao Rural Commercial Bank
"""

for i, line in enumerate(banks.split("\n")):
        print(f'{{"prompt": "{line} Mortgage Interest", "completion": "!Yes,Deduction,MInterest!###"}}')

drugs = """
Lipitor
Synthroid
Prinivil or Zestril
Ventolin
Glucophage
Norvasc
Prilosec
Zocor
Cozaar
Zithromax
Microzide
Lexapro
Neurontin
Zoloft
Amoxil
Ultram
Celexa
Deltasone
Desyrel
Lasix
Adderall
Klonopin
Advair
Xanax
Flomax
Prozac
Ambien
Wellbutrin
Paxil
Depakote
Tricor
Singulair
Cymbalta
Plavix
Asacol
Risperdal
Pristiq
Nasonex
Celebrex
Effexor
Lyrica
Aricept
Seroquel
Vyvanse
Namenda
Lunesta
Focalin
Fosamax
Chantix
Humira
Trileptal
Cipro
Lamictal
Mobic
Benicar
Topamax
Cialis
Proventil
Lovenox
Zetia
Xalatan
Allegra
Tegretol
Elavil
Spiriva
Actonel
Aciphex
Colcrys
Bystolic
Levemir
Invokana
Janumet
Symbicort
Januvia
Nuvaring
Novolog
Diflucan
Advil
Nexium
Restasis
Cialis
Zyprexa
Lantus
Synagis
Aranesp
Orencia
Cimzia
Sandostatin
Lumigan
Opana
Tysabri
Xgeva
Oxycontin
Victoza
Ranexa
Actemra
Kineret
Humalog
Zometa
Exelon
"""

for i, line in enumerate(drugs.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!Yes,Deduction,Medical!###"}}')

hospitals = """
Johns Hopkins Hospital
Mayo Clinic
Massachusetts General Hospital
Cleveland Clinic
New York-Presbyterian Hospital
UCSF Medical Center
Duke University Hospital
Northwestern Memorial Hospital
Brigham and Women's Hospital
Mount Sinai Hospital
Cedars-Sinai Medical Center
Stanford Health Care
Barnes-Jewish Hospital
Emory University Hospital
Houston Methodist Hospital
Michigan Medicine
Vanderbilt University Medical Center
Rush University Medical Center
Yale-New Haven Hospital
Children's Hospital of Philadelphia
University of Michigan Hospitals-Michigan Medicine
Mayo Clinic Hospital - Phoenix
Banner - University Medical Center Phoenix
Children's Hospital Los Angeles
NewYork-Presbyterian Queens Hospital
University of Iowa Hospitals & Clinics
Duke University Hospital
Houston Methodist West Hospital
Brigham and Women's Faulkner Hospital
Massachusetts General Hospital
Cleveland Clinic
Mayo Clinic Health System
UCSF Medical Center
Mercy Hospital St. Louis
The Christ Hospital Health Network
Mercy Health - West Hospital
Houston Methodist Sugar Land Hospital
OSF Saint Francis Medical Center
Advocate Lutheran General Hospital
Providence Holy Cross Medical Center
NewYork-Presbyterian Lower Manhattan Hospital
Northwestern Medicine Central DuPage Hospital
St. Joseph's Hospital and Medical Center
UAB Hospital
Cleveland Clinic Florida
Baptist Medical Center Jacksonville
Emory Saint Joseph's Hospital
NewYork-Presbyterian Brooklyn Methodist Hospital
Cedars-Sinai Marina del Rey Hospital
Stanford Health Care
Mercy Hospital Springfield
NYU Langone Health - Tisch Hospital
Northwestern Medicine Lake Forest Hospital
Massachusetts Eye and Ear Infirmary
Houston Methodist Clear Lake Hospital
University of Miami Hospital
Memorial Hermann Katy Hospital
Duke University Hospital
UPMC Hamot
Kaiser Permanente San Francisco Medical Center and Medical Offices
Saint Thomas Midtown Hospital
Virginia Mason Medical Center
St. David's Medical Center
Saint Luke's Hospital of Kansas City
Rush Copley Medical Center
IU Health Bloomington Hospital
Mayo Clinic Health System in La Crosse
Mount Sinai Morningside
Northside Hospital Forsyth
Inova Fairfax Hospital
Children's Hospital Colorado
AdventHealth Orlando
Rush University Medical Center
Loyola University Medical Center
Children's Hospital at Montefiore
Houston Methodist Willowbrook Hospital
Providence Alaska Medical Center
Dartmouth-Hitchcock Medical Center
UCHealth Memorial Hospital Central
Wellstar Atlanta Medical Center
NYU Langone Health - NYU Winthrop Hospital
St. David's South Austin Medical Center
Advocate Sherman Hospital
Mayo Clinic Health System in Eau Claire
Beth Israel Deaconess Medical Center
NewYork-Presbyterian Hudson Valley Hospital
Memorial Hermann Greater Heights Hospital
Cleveland Clinic Hillcrest Hospital
University of Kansas Hospital
Maine Medical Center
Advocate Good Samaritan Hospital
AdventHealth Shawnee Mission
St. Vincent Healthcare
Memorial
"""

for i, line in enumerate(hospitals.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!Yes,Deduction,Medical!###"}}')

charities = """
American Red Cross
Habitat for Humanity
World Wildlife Fund
Doctors Without Borders
UNICEF
St. Jude Children's Research Hospital
The Nature Conservancy
The Salvation Army
Feeding America
The Trevor Project
Make-A-Wish Foundation
Amnesty International
Big Brothers Big Sisters of America
Oxfam
United Way Worldwide
Goodwill Industries International
March of Dimes
Boys & Girls Clubs of America
Project HOPE
Save the Children
Ronald McDonald House Charities
PETA
ASPCA
Mercy Corps
The Carter Center
Wounded Warrior Project
Teach for America
Smile Train
Charity: water
Shriners Hospitals for Children
The Michael J. Fox Foundation for Parkinson's Research
American Cancer Society
American Heart Association
Alzheimer's Association
National Multiple Sclerosis Society
Cystic Fibrosis Foundation
Leukemia & Lymphoma Society
American Diabetes Association
National Alliance on Mental Illness
Autism Speaks
The Humane Society of the United States
World Vision
The ALS Association
Special Olympics
National Breast Cancer Foundation
Habitat for Humanity International
American Lung Association
Children International
The Leukemia & Lymphoma Society
The Trevor Project
The Nature Conservancy
World Wildlife Fund
International Rescue Committee
Rainforest Alliance
Natural Resources Defense Council
World Resources Institute
National Wildlife Federation
Water.org
The Ocean Conservancy
Best Friends Animal Society
United Negro College Fund
The Sierra Club Foundation
American Civil Liberties Union
National Council of La Raza
National Immigration Law Center
Southern Poverty Law Center
National Women's Law Center
Planned Parenthood Federation of America
National Council on Aging
The Innocence Project
Global Fund for Women
Dress for Success
Susan G. Komen for the Cure
Boys Town
Hope for Haiti's Children
Children's Miracle Network Hospitals
Friends of the Earth
American Indian College Fund
National Eating Disorders Association
Partnership for Drug-Free Kids
Thurgood Marshall College Fund
The Trevor Project
United States Fund for UNICEF
Big Cat Rescue
No Kid Hungry
Invisible Children
Smile Train
American Rivers
The Christopher & Dana Reeve Foundation
The Humane Society Legislative Fund
Farm Aid
The V Foundation for Cancer Research
Safe Kids Worldwide
City Year
The Arthritis Foundation
National Ataxia Foundation
The National Campaign to Prevent Teen and Unplanned Pregnancy
The Children's Defense Fund
The Elizabeth Glaser Pediatric AIDS Foundation
The Epilepsy Foundation.
"""

for i, line in enumerate(charities.split("\n")):
        print(f'{{"prompt": "{line}", "completion": "!Yes,Deduction,Donation!###"}}')