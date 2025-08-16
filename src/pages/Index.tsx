import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Item {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  stock: number;
  price?: number;
  lastSeen?: string;
  chance?: number;
}

const Index = () => {
  const [trackedItems, setTrackedItems] = useState<string[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const seedsData: Item[] = [
    { id: '1', name: 'Морковные семена', image: '/img/570fbe4c-43df-46a5-abc5-8942af703271.jpg', rarity: 'common', stock: 50, price: 10 },
    { id: '2', name: 'Семена радуги', image: '/img/570fbe4c-43df-46a5-abc5-8942af703271.jpg', rarity: 'epic', stock: 3, price: 500 },
    { id: '3', name: 'Золотые семена', image: '/img/570fbe4c-43df-46a5-abc5-8942af703271.jpg', rarity: 'legendary', stock: 0, price: 1000, lastSeen: '2 часа назад' },
  ];

  const toolsData: Item[] = [
    { id: '4', name: 'Обычная лопата', image: '/img/7c5b26a1-fba4-4d46-aac2-df73f7298283.jpg', rarity: 'common', stock: 25, price: 50 },
    { id: '5', name: 'Алмазная лопата', image: '/img/7c5b26a1-fba4-4d46-aac2-df73f7298283.jpg', rarity: 'rare', stock: 8, price: 200 },
    { id: '6', name: 'Магическая лопата', image: '/img/7c5b26a1-fba4-4d46-aac2-df73f7298283.jpg', rarity: 'legendary', stock: 1, price: 800 },
  ];

  const eggsData: Item[] = [
    { id: '7', name: 'Куриное яйцо', image: '/img/3811f9a5-9b2b-43e3-b175-6a0da2a0d1b1.jpg', rarity: 'common', stock: 30, price: 25 },
    { id: '8', name: 'Драконье яйцо', image: '/img/3811f9a5-9b2b-43e3-b175-6a0da2a0d1b1.jpg', rarity: 'epic', stock: 2, price: 750 },
    { id: '9', name: 'Феникс яйцо', image: '/img/3811f9a5-9b2b-43e3-b175-6a0da2a0d1b1.jpg', rarity: 'legendary', stock: 0, price: 1500, lastSeen: '5 часов назад' },
  ];

  const decorData: Item[] = [
    { id: '10', name: 'Садовый гном', image: '/img/570fbe4c-43df-46a5-abc5-8942af703271.jpg', rarity: 'uncommon', stock: 15, price: 75 },
    { id: '11', name: 'Магический фонтан', image: '/img/570fbe4c-43df-46a5-abc5-8942af703271.jpg', rarity: 'rare', stock: 5, price: 300 },
  ];

  const allItems = [...seedsData, ...toolsData, ...eggsData, ...decorData];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-rarity-common text-white';
      case 'uncommon': return 'bg-rarity-uncommon text-white';
      case 'rare': return 'bg-rarity-rare text-white';
      case 'epic': return 'bg-rarity-epic text-white';
      case 'legendary': return 'bg-rarity-legendary text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  const toggleTracking = (itemId: string) => {
    setTrackedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const rareItems = allItems.filter(item => ['rare', 'epic', 'legendary'].includes(item.rarity) && item.stock > 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const ItemCard = ({ item, showTracking = false }: { item: Item, showTracking?: boolean }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-2 border-game-orange/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
          <div className="flex-1">
            <h3 className="font-semibold text-game-navy">{item.name}</h3>
            <Badge className={`${getRarityColor(item.rarity)} text-xs`}>
              {item.rarity}
            </Badge>
            {item.stock > 0 ? (
              <p className="text-sm text-green-600 font-medium">В наличии: {item.stock}</p>
            ) : (
              <p className="text-sm text-red-500 font-medium">Нет в наличии</p>
            )}
            {item.price && <p className="text-sm text-game-navy font-bold">${item.price}</p>}
            {item.lastSeen && <p className="text-xs text-gray-500">Видели: {item.lastSeen}</p>}
          </div>
          {showTracking && (
            <Checkbox 
              checked={trackedItems.includes(item.id)}
              onCheckedChange={() => toggleTracking(item.id)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );

  const CategorySection = ({ title, items, icon }: { title: string, items: Item[], icon: string }) => (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-game-orange/30">
      <CardHeader className="bg-gradient-to-r from-game-orange to-game-cyan text-white">
        <CardTitle className="flex items-center gap-2">
          <Icon name={icon} size={24} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {items.map(item => (
          <ItemCard key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-game-orange via-game-cyan to-game-purple shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">🌱 GROW A GARDEN</h1>
              <span className="text-xl text-white/90">TRACKER</span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" className="text-white hover:bg-white/20">Главная</Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">Сток</Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">История</Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">Шансы</Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-game-navy mb-6 leading-tight">
            Отслеживай редкие товары<br />
            <span className="text-game-orange">в реальном времени!</span>
          </h2>
          <p className="text-xl text-game-navy/80 mb-8 max-w-3xl mx-auto">
            Никогда не упускай редкие предметы! Мы автоматически отслеживаем все магазины 
            и уведомляем тебя о появлении легендарных товаров.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-game-orange hover:bg-game-orange/90 text-white font-bold text-lg px-8 py-4">
              <Icon name="Bell" className="mr-2" />
              Подписаться на уведомления
            </Button>
            <Card className="bg-game-cyan/20 border-game-cyan">
              <CardContent className="p-4">
                <p className="text-game-navy font-semibold">
                  📱 Подпишись на наш Telegram-канал, чтобы получать уведомления о редких товарах без посещения сайта
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Stock */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-game-navy mb-4">Текущий сток магазинов</h2>
            <p className="text-game-navy/70">Обновляется каждые 5 минут. Последнее обновление: {lastUpdate.toLocaleTimeString()}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CategorySection title="Семена" items={seedsData} icon="Sprout" />
            <CategorySection title="Инструменты" items={toolsData} icon="Wrench" />
            <CategorySection title="Яйца" items={eggsData} icon="Egg" />
            <CategorySection title="Декор" items={decorData} icon="Sparkles" />
          </div>
        </div>
      </section>

      {/* Rare Items */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-game-navy text-center mb-8">🔥 Редкие товары в стоке</h2>
          {rareItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rareItems.map(item => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <Card className="bg-gradient-to-r from-game-purple/20 to-game-orange/20 border-2 border-game-orange/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-game-navy mb-4">Сейчас нет редких товаров</h3>
                <p className="text-game-navy/70 mb-4">Сюда попадают:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div>
                    <h4 className="font-semibold text-game-orange">Редкие семена:</h4>
                    <ul className="text-sm text-game-navy/70">
                      <li>• Семена радуги</li>
                      <li>• Золотые семена</li>
                      <li>• Кристальные семена</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-game-cyan">Легендарные инструменты:</h4>
                    <ul className="text-sm text-game-navy/70">
                      <li>• Магическая лопата</li>
                      <li>• Божественные ножницы</li>
                      <li>• Лейка времени</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Tracking Section */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-game-navy text-center mb-8">📌 Отслеживаемое</h2>
          <div className="flex justify-center mb-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-game-orange hover:bg-game-orange/90 text-white font-bold">
                  <Icon name="Plus" className="mr-2" />
                  Добавить товары для отслеживания
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
                <DialogHeader>
                  <DialogTitle>Выберите товары для отслеживания</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="seeds" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="seeds">Семена</TabsTrigger>
                    <TabsTrigger value="tools">Инструменты</TabsTrigger>
                    <TabsTrigger value="eggs">Яйца</TabsTrigger>
                    <TabsTrigger value="decor">Декор</TabsTrigger>
                  </TabsList>
                  <TabsContent value="seeds" className="space-y-3">
                    {seedsData.map(item => <ItemCard key={item.id} item={item} showTracking />)}
                  </TabsContent>
                  <TabsContent value="tools" className="space-y-3">
                    {toolsData.map(item => <ItemCard key={item.id} item={item} showTracking />)}
                  </TabsContent>
                  <TabsContent value="eggs" className="space-y-3">
                    {eggsData.map(item => <ItemCard key={item.id} item={item} showTracking />)}
                  </TabsContent>
                  <TabsContent value="decor" className="space-y-3">
                    {decorData.map(item => <ItemCard key={item.id} item={item} showTracking />)}
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
          {trackedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trackedItems.map(itemId => {
                const item = allItems.find(i => i.id === itemId);
                return item ? <ItemCard key={item.id} item={item} /> : null;
              })}
            </div>
          ) : (
            <Card className="bg-white/80 border-2 border-dashed border-game-orange/50">
              <CardContent className="p-8 text-center">
                <Icon name="Eye" size={48} className="mx-auto mb-4 text-game-orange/50" />
                <p className="text-game-navy/70">Вы еще не выбрали товары для отслеживания</p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* History & Chances */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="history" className="w-full">
            <div className="text-center mb-8">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="history">📊 История появлений</TabsTrigger>
                <TabsTrigger value="chances">🎲 Шансы появления</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="history">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-game-orange">Семена</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {seedsData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.lastSeen || 'В стоке'}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-game-cyan">Инструменты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {toolsData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.lastSeen || 'В стоке'}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-game-purple">Яйца</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {eggsData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-gray-500">{item.lastSeen || 'В стоке'}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="chances">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-game-orange">Семена</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {seedsData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name}</span>
                        <Badge className={getRarityColor(item.rarity)}>
                          {item.rarity === 'common' ? '85%' : 
                           item.rarity === 'rare' ? '10%' : 
                           item.rarity === 'epic' ? '4%' : '1%'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-game-cyan">Инструменты</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {toolsData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name}</span>
                        <Badge className={getRarityColor(item.rarity)}>
                          {item.rarity === 'common' ? '80%' : 
                           item.rarity === 'rare' ? '15%' : 
                           item.rarity === 'epic' ? '4%' : '1%'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-game-purple">Яйца</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {eggsData.map(item => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="font-medium">{item.name}</span>
                        <Badge className={getRarityColor(item.rarity)}>
                          {item.rarity === 'common' ? '70%' : 
                           item.rarity === 'rare' ? '20%' : 
                           item.rarity === 'epic' ? '8%' : '2%'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* SEO Section */}
      <section className="py-12 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-game-orange">О Grow a Garden Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-game-navy/80">
                  Grow a Garden Tracker — это самый точный и быстрый сервис для отслеживания товаров 
                  в популярной игре Roblox. Мы мониторим все магазины каждые 5 минут и мгновенно 
                  уведомляем о появлении редких предметов.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-game-cyan">Преимущества сервиса</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-game-navy/80">
                  <li>✅ Автоматическое обновление каждые 5 минут</li>
                  <li>✅ Уведомления в Telegram о редких товарах</li>
                  <li>✅ История появлений всех предметов</li>
                  <li>✅ Статистика шансов появления</li>
                  <li>✅ Персональное отслеживание товаров</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-game-navy text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">🌱 GROW A GARDEN TRACKER</h3>
          <p className="text-white/70 mb-4">
            Самый точный трекер товаров для Grow a Garden в Roblox
          </p>
          <div className="flex justify-center gap-4 mb-4">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="MessageSquare" className="mr-2" />
              Telegram
            </Button>
            <Button variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="Users" className="mr-2" />
              Discord
            </Button>
          </div>
          <p className="text-white/50 text-sm">
            © 2024 Grow a Garden Tracker. Не связан с Roblox Corporation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;