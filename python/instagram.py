from instagram_private_api import Client, ClientCompatPatch

user_name = input("username\n>")
password = input("password\n>")

api = Client(user_name, password)
results = api.saved_feed(1000)
items = [item for item in results.get('items', [])
         if item.get('media')]
images = []
for item in items:
    # Manually patch the entity to match the public api as closely as possible, optional
    # To automatically patch entities, initialise the Client with auto_patch=True
    ClientCompatPatch.media(item['media'])
    url = item['media']['images']['standard_resolution']['url']
    images.append(url)

