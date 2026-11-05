# 1. book/page.tsx
path = r'C:\Users\Solomon\Desktop\ABL v2\app\book\page.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('  "Mens Wear",\n', '')
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# 2. data/services.ts
path = r'C:\Users\Solomon\Desktop\ABL v2\data\services.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old = ''' {
 id: 'mens-wear',
 number: '03',
 title: "Mens Wear",
 description:
 'Sharp, tailored, and confident. From agbada to modern suits, we craft menswear that commands presence and reflects personality.',
 benefits: ['Agbada and traditional wear', 'Tailored suits', 'Kaftans and tunics', 'Custom shirts'],
 image:
 'https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=1200',
 featured: true,
 },
'''
content = content.replace(old, '')
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

# 3. data/collections.ts
path = r'C:\Users\Solomon\Desktop\ABL v2\data\collections.ts'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()
old = ''' {
 id: 'mens-suit-2',
 title: 'Modern Slim Suit',
 category: "Mens Suits",
 image:
 'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=800',
 description:
 'A modern slim-fit suit in charcoal, tailored for the man who values clean lines and confident style.',
 size: 'small',
 },
'''
new = ''' {
 id: 'traditional-wear-1',
 title: 'Ankara Traditional Set',
 category: 'Traditional Wear',
 image:
 'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800',
 description:
 'A vibrant Ankara traditional set celebrating African heritage with modern tailoring, crafted for cultural occasions.',
 size: 'small',
 },
'''
content = content.replace(old, new)
content = content.replace("Men's Suits", 'Traditional Wear')
with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')