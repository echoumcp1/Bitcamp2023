counter = 0
with open("colleges.txt", "r") as file:
    for line in file:
        if counter % 20 == 0:
            print(f"{{\"prompt\":\"{line[:-6]}\\n\n###\n\n \", \"completion\":\" Yes,Credit,American Opprotunity Credit Tax Credit###}}")
        counter += 1

# with open("states.txt") as file1:
#     for line in file1:
#         print(f"{{\"prompt\":\"{line}\\nSupported: \", \"completion\":\"Yes,Credit,State Taxes You Paid"}}")

# test = """
# Walmart
# Target
# Costco
# Home Depot
# Lowe's
# Best Buy
# Macy's
# Kohl's
# J.C. Penney
# Sears
# Nordstrom
# Neiman Marcus
# Bloomingdale's
# Saks Fifth Avenue
# Gap
# Old Navy
# Banana Republic
# H&M
# Forever 21
# Zara
# Nike
# Adidas
# Reebok
# Foot Locker
# Dick's Sporting Goods
# Bass Pro Shops
# Cabela's
# Petco
# PetSmart
# Barnes & Noble
# Books-A-Million
# GameStop
# Michaels
# Jo-Ann Fabric and Craft Stores
# Hobby Lobby
# Dollar General
# Family Dollar
# Dollar Tree
# 7-Eleven
# Circle K
# QuikTrip
# Wawa
# Sheetz
# Speedway
# CVS
# Walgreens
# Rite Aid
# 99 Cents Only Stores
# Five Below
# Party City
# Spencer's
# Bed Bath & Beyond
# Williams-Sonoma
# Pottery Barn
# Crate & Barrel
# Pier 1 Imports
# IKEA
# Anthropologie
# Urban Outfitters
# American Eagle Outfitters
# Abercrombie & Fitch
# Hollister
# Victoria's Secret
# Bath & Body Works
# The Body Shop
# Sephora
# Ulta Beauty
# MAC Cosmetics
# Lush
# Sunglass Hut
# LensCrafters
# Warby Parker
# T-Mobile
# Verizon
# AT&T
# Sprint
# The Apple Store
# Microsoft Store
# Google Store
# Tesla
# BMW
# Mercedes-Benz
# Audi
# Porsche
# Ford
# Chevrolet
# Toyota
# Honda
# Nissan
# Mitsubishi
# Kia
# Hyundai
# Tesla
# Subaru
# Volvo
# Mazda
# Lexus
# Acura
# Infiniti
# Jeep
# """

# for i, line in enumerate(test.split("\n")):
#         print(f'{{"prompt": "{line} \\nSupported", "completion": "No"}}')

# online = """
# PayPal
# Venmo
# Cash App
# Zelle
# Google Pay
# Apple Pay
# Stripe
# Square
# Skrill
# TransferWise
# """
# for i, line in enumerate(online.split("\n")):
#         print(f'{{"prompt": "{line} \\nSupported", "completion": "No"}}')