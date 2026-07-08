import type { Availability, Product, Specification } from '@/types'
import { calcDiscountPercent } from '@/utils/format'
import { getStockImages } from './productImages'

interface ProductInput {
  id: string
  slug: string
  name: string
  category: string
  subcategory: string
  brand: string
  price: number
  oldPrice?: number | null
  unit?: string
  description: string
  specifications: Specification[]
  availability?: Availability
  rating: number
  reviewsCount: number
  popular?: boolean
  new?: boolean
}

function makeProduct(input: ProductInput): Product {
  const oldPrice = input.oldPrice ?? null
  return {
    id: input.id,
    slug: input.slug,
    name: input.name,
    category: input.category,
    subcategory: input.subcategory,
    brand: input.brand,
    price: input.price,
    oldPrice,
    unit: input.unit ?? 'шт.',
    description: input.description,
    specifications: input.specifications,
    images: getStockImages(input.id, 3),
    availability: input.availability ?? 'in_stock',
    rating: input.rating,
    reviewsCount: input.reviewsCount,
    popular: input.popular ?? false,
    new: input.new ?? false,
    discount: calcDiscountPercent(input.price, oldPrice),
  }
}

export const products: Product[] = [
  // Отводы
  makeProduct({
    id: 'p-001',
    slug: 'otvod-90-stalnoy-dn50',
    name: 'Отвод 90° стальной DN50',
    category: 'otvody',
    subcategory: 'Отводы стальные',
    brand: 'ПТПА',
    price: 2100,
    description:
      'Крутоизогнутый стальной отвод 90° для поворота трубопровода на прямой угол. Используется в системах отопления, водоснабжения и промышленных трубопроводах.',
    specifications: [
      { title: 'Диаметр (DN)', value: '50 мм' },
      { title: 'Угол', value: '90°' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Присоединение', value: 'Приварное' },
      { title: 'Стандарт', value: 'ГОСТ 17375-2001' },
    ],
    rating: 4.7,
    reviewsCount: 34,
    popular: true,
  }),
  makeProduct({
    id: 'p-002',
    slug: 'otvod-45-stalnoy-dn80',
    name: 'Отвод 45° стальной DN80',
    category: 'otvody',
    subcategory: 'Отводы стальные',
    brand: 'ПТПА',
    price: 3400,
    description:
      'Отвод 45° из углеродистой стали для плавного изменения направления трубопровода без потери давления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '80 мм' },
      { title: 'Угол', value: '45°' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Присоединение', value: 'Приварное' },
      { title: 'Вес', value: '1.6 кг' },
    ],
    rating: 4.6,
    reviewsCount: 18,
    new: true,
  }),
  makeProduct({
    id: 'p-003',
    slug: 'otvod-90-nerzhaveyushiy-dn25',
    name: 'Отвод 90° нержавеющий DN25',
    category: 'otvody',
    subcategory: 'Отводы нержавеющие',
    brand: 'Tecofi',
    price: 1800,
    oldPrice: 2200,
    description:
      'Отвод из нержавеющей стали AISI 304 для пищевых, медицинских и агрессивных сред. Устойчив к коррозии.',
    specifications: [
      { title: 'Диаметр (DN)', value: '25 мм' },
      { title: 'Угол', value: '90°' },
      { title: 'Материал', value: 'Нержавеющая сталь AISI 304' },
      { title: 'Присоединение', value: 'Под сварку' },
    ],
    rating: 4.8,
    reviewsCount: 12,
  }),

  // Тройники
  makeProduct({
    id: 'p-004',
    slug: 'troynik-ravnoprohodnoy-dn65',
    name: 'Тройник равнопроходной DN65',
    category: 'troyniki',
    subcategory: 'Тройники стальные',
    brand: 'ПТПА',
    price: 3200,
    description:
      'Равнопроходной тройник для разветвления трубопровода на три направления одного диаметра. Приварное исполнение.',
    specifications: [
      { title: 'Диаметр (DN)', value: '65 мм' },
      { title: 'Тип', value: 'Равнопроходной' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Стандарт', value: 'ГОСТ 17376-2001' },
    ],
    rating: 4.5,
    reviewsCount: 22,
  }),
  makeProduct({
    id: 'p-005',
    slug: 'troynik-perehodnoy-dn100-50',
    name: 'Тройник переходной DN100/50',
    category: 'troyniki',
    subcategory: 'Тройники стальные',
    brand: 'ПТПА',
    price: 5600,
    description:
      'Переходной тройник с уменьшенным ответвлением DN50 на магистрали DN100. Применяется в системах отопления и водоснабжения.',
    specifications: [
      { title: 'Диаметр магистрали', value: '100 мм' },
      { title: 'Диаметр ответвления', value: '50 мм' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Присоединение', value: 'Приварное' },
    ],
    rating: 4.6,
    reviewsCount: 41,
    popular: true,
  }),
  makeProduct({
    id: 'p-006',
    slug: 'troynik-latunnyy-dn20',
    name: 'Тройник латунный DN20',
    category: 'troyniki',
    subcategory: 'Тройники латунные',
    brand: 'Valtec',
    price: 950,
    description:
      'Латунный резьбовой тройник для внутренних систем водоснабжения и отопления малого диаметра.',
    specifications: [
      { title: 'Диаметр (DN)', value: '20 мм' },
      { title: 'Резьба', value: '3/4" внутренняя' },
      { title: 'Материал', value: 'Латунь CW617N' },
      { title: 'Макс. давление', value: '16 бар' },
    ],
    rating: 4.4,
    reviewsCount: 9,
    new: true,
  }),

  // Муфты
  makeProduct({
    id: 'p-007',
    slug: 'mufta-soedinitelnaya-dn32',
    name: 'Муфта соединительная DN32',
    category: 'mufty',
    subcategory: 'Муфты стальные',
    brand: 'TIM',
    price: 480,
    description:
      'Стальная резьбовая муфта для прямого соединения труб одного диаметра. Простой и надёжный монтаж.',
    specifications: [
      { title: 'Диаметр (DN)', value: '32 мм' },
      { title: 'Резьба', value: '1 1/4"' },
      { title: 'Материал', value: 'Сталь оцинкованная' },
    ],
    rating: 4.3,
    reviewsCount: 27,
  }),
  makeProduct({
    id: 'p-008',
    slug: 'mufta-kombinirovannaya-dn25',
    name: 'Муфта комбинированная DN25',
    category: 'mufty',
    subcategory: 'Муфты комбинированные',
    brand: 'Valtec',
    price: 620,
    oldPrice: 780,
    description:
      'Комбинированная муфта «наружная-внутренняя резьба» для перехода между разными типами соединений.',
    specifications: [
      { title: 'Диаметр (DN)', value: '25 мм' },
      { title: 'Резьба', value: '1" НР / 1" ВР' },
      { title: 'Материал', value: 'Латунь' },
    ],
    rating: 4.5,
    reviewsCount: 15,
  }),
  makeProduct({
    id: 'p-009',
    slug: 'mufta-ppr-dn40',
    name: 'Муфта ППР DN40',
    category: 'mufty',
    subcategory: 'Муфты полипропиленовые',
    brand: 'Rehau',
    price: 340,
    description:
      'Полипропиленовая муфта для сварных соединений труб ППР в системах холодного и горячего водоснабжения.',
    specifications: [
      { title: 'Диаметр (DN)', value: '40 мм' },
      { title: 'Материал', value: 'PPR PN20' },
      { title: 'Соединение', value: 'Раструбная сварка' },
    ],
    rating: 4.7,
    reviewsCount: 33,
    popular: true,
  }),

  // Переходы
  makeProduct({
    id: 'p-010',
    slug: 'perehod-kontsentricheskiy-dn80-50',
    name: 'Переход концентрический DN80/50',
    category: 'perehody',
    subcategory: 'Переходы стальные',
    brand: 'ПТПА',
    price: 2900,
    description:
      'Концентрический переход для соосного соединения труб разного диаметра без смещения оси потока.',
    specifications: [
      { title: 'Больший диаметр', value: '80 мм' },
      { title: 'Меньший диаметр', value: '50 мм' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Тип', value: 'Концентрический' },
    ],
    rating: 4.5,
    reviewsCount: 14,
  }),
  makeProduct({
    id: 'p-011',
    slug: 'perehod-ekstsentricheskiy-dn100-65',
    name: 'Переход эксцентрический DN100/65',
    category: 'perehody',
    subcategory: 'Переходы стальные',
    brand: 'ПТПА',
    price: 3600,
    description:
      'Эксцентрический переход со смещённой осью — применяется там, где важно сохранить уровень нижней образующей трубы.',
    specifications: [
      { title: 'Больший диаметр', value: '100 мм' },
      { title: 'Меньший диаметр', value: '65 мм' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Тип', value: 'Эксцентрический' },
    ],
    rating: 4.4,
    reviewsCount: 7,
    new: true,
    availability: 'out_of_stock',
  }),
  makeProduct({
    id: 'p-012',
    slug: 'perehod-rezbovoy-1-34',
    name: 'Переход резьбовой 1"×3/4"',
    category: 'perehody',
    subcategory: 'Переходы резьбовые',
    brand: 'TIM',
    price: 260,
    description:
      'Резьбовой переходник для соединения труб и арматуры с разным диаметром резьбы.',
    specifications: [
      { title: 'Резьба 1', value: '1" наружная' },
      { title: 'Резьба 2', value: '3/4" внутренняя' },
      { title: 'Материал', value: 'Латунь' },
    ],
    rating: 4.2,
    reviewsCount: 19,
  }),

  // Заглушки
  makeProduct({
    id: 'p-013',
    slug: 'zaglushka-rezbovaya-1',
    name: 'Заглушка резьбовая 1"',
    category: 'zaglushki',
    subcategory: 'Заглушки резьбовые',
    brand: 'TIM',
    price: 180,
    description: 'Резьбовая заглушка для герметичного перекрытия конца трубопровода при обслуживании или ревизии.',
    specifications: [
      { title: 'Резьба', value: '1" наружная' },
      { title: 'Материал', value: 'Сталь оцинкованная' },
    ],
    rating: 4.3,
    reviewsCount: 44,
  }),
  makeProduct({
    id: 'p-014',
    slug: 'zaglushka-flantsevaya-dn80-pn16',
    name: 'Заглушка фланцевая DN80 PN16',
    category: 'zaglushki',
    subcategory: 'Заглушки фланцевые',
    brand: 'ПТПА',
    price: 1450,
    description: 'Стальная фланцевая заглушка для полного перекрытия трубопровода на фланцевом соединении.',
    specifications: [
      { title: 'Диаметр (DN)', value: '80 мм' },
      { title: 'Давление (PN)', value: '16 бар' },
      { title: 'Материал', value: 'Сталь 20' },
    ],
    rating: 4.6,
    reviewsCount: 21,
    popular: true,
  }),
  makeProduct({
    id: 'p-015',
    slug: 'zaglushka-ellipticheskaya-dn50',
    name: 'Заглушка эллиптическая DN50',
    category: 'zaglushki',
    subcategory: 'Заглушки приварные',
    brand: 'БАЗ',
    price: 890,
    oldPrice: 1050,
    description: 'Эллиптическая приварная заглушка повышенной прочности для трубопроводов высокого давления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '50 мм' },
      { title: 'Форма', value: 'Эллиптическая' },
      { title: 'Материал', value: 'Сталь 20' },
    ],
    rating: 4.5,
    reviewsCount: 8,
  }),

  // Краны шаровые
  makeProduct({
    id: 'p-016',
    slug: 'kran-sharovoy-dn25',
    name: 'Кран шаровой DN25',
    category: 'krany-sharovye',
    subcategory: 'Краны шаровые муфтовые',
    brand: 'Genebre',
    price: 3200,
    description:
      'Латунный шаровой кран с полным проходом для запорной арматуры водопроводных и отопительных систем.',
    specifications: [
      { title: 'Диаметр (DN)', value: '25 мм' },
      { title: 'Тип прохода', value: 'Полный проход' },
      { title: 'Материал', value: 'Латунь, хром' },
      { title: 'Макс. давление', value: '25 бар' },
      { title: 'Рабочая температура', value: 'до 110°C' },
    ],
    rating: 4.8,
    reviewsCount: 76,
    popular: true,
  }),
  makeProduct({
    id: 'p-017',
    slug: 'kran-sharovoy-flantsevyy-dn50',
    name: 'Кран шаровой фланцевый DN50',
    category: 'krany-sharovye',
    subcategory: 'Краны шаровые фланцевые',
    brand: 'Broen',
    price: 12800,
    description:
      'Стальной фланцевый шаровой кран промышленного класса для магистральных трубопроводов и котельных.',
    specifications: [
      { title: 'Диаметр (DN)', value: '50 мм' },
      { title: 'Давление (PN)', value: '16 бар' },
      { title: 'Материал корпуса', value: 'Углеродистая сталь' },
      { title: 'Привод', value: 'Рычаг' },
    ],
    rating: 4.9,
    reviewsCount: 29,
    new: true,
  }),
  makeProduct({
    id: 'p-018',
    slug: 'kran-sharovoy-muftovyy-dn15',
    name: 'Кран шаровой муфтовый DN15',
    category: 'krany-sharovye',
    subcategory: 'Краны шаровые муфтовые',
    brand: 'Genebre',
    price: 1650,
    oldPrice: 1980,
    description: 'Компактный шаровой кран малого диаметра для локального отключения точек водоразбора.',
    specifications: [
      { title: 'Диаметр (DN)', value: '15 мм' },
      { title: 'Резьба', value: '1/2"' },
      { title: 'Материал', value: 'Никелированная латунь' },
    ],
    rating: 4.6,
    reviewsCount: 52,
  }),

  // Задвижки
  makeProduct({
    id: 'p-019',
    slug: 'zadvizhka-klinovaya-dn100',
    name: 'Задвижка клиновая DN100',
    category: 'zadvizhki',
    subcategory: 'Задвижки клиновые',
    brand: 'Broen',
    price: 48500,
    description:
      'Клиновая задвижка с обрезиненным клином для надёжного перекрытия потока в системах водоснабжения и теплоснабжения.',
    specifications: [
      { title: 'Диаметр (DN)', value: '100 мм' },
      { title: 'Давление (PN)', value: '16 бар' },
      { title: 'Материал корпуса', value: 'Чугун ВЧШГ' },
      { title: 'Присоединение', value: 'Фланцевое' },
    ],
    rating: 4.7,
    reviewsCount: 16,
    popular: true,
  }),
  makeProduct({
    id: 'p-020',
    slug: 'zadvizhka-chugunnaya-30ch6br-dn80',
    name: 'Задвижка чугунная 30ч6бр DN80',
    category: 'zadvizhki',
    subcategory: 'Задвижки чугунные',
    brand: 'БАЗ',
    price: 32000,
    description:
      'Классическая чугунная задвижка серии 30ч6бр для промышленных и коммунальных трубопроводов.',
    specifications: [
      { title: 'Диаметр (DN)', value: '80 мм' },
      { title: 'Давление (PN)', value: '10 бар' },
      { title: 'Материал корпуса', value: 'Чугун СЧ20' },
    ],
    rating: 4.4,
    reviewsCount: 11,
    availability: 'on_order',
  }),
  makeProduct({
    id: 'p-021',
    slug: 'zadvizhka-stalnaya-dn150',
    name: 'Задвижка стальная DN150',
    category: 'zadvizhki',
    subcategory: 'Задвижки стальные',
    brand: 'ПТПА',
    price: 89000,
    description:
      'Стальная задвижка большого диаметра для магистральных трубопроводов теплосетей и промышленных объектов.',
    specifications: [
      { title: 'Диаметр (DN)', value: '150 мм' },
      { title: 'Давление (PN)', value: '25 бар' },
      { title: 'Материал корпуса', value: 'Сталь 25Л' },
    ],
    rating: 4.8,
    reviewsCount: 5,
    new: true,
    availability: 'on_order',
  }),

  // Клапаны
  makeProduct({
    id: 'p-022',
    slug: 'klapan-obratnyy-dn65',
    name: 'Клапан обратный DN65',
    category: 'klapany',
    subcategory: 'Клапаны обратные',
    brand: 'Genebre',
    price: 8200,
    description: 'Обратный клапан для предотвращения обратного тока рабочей среды в трубопроводе.',
    specifications: [
      { title: 'Диаметр (DN)', value: '65 мм' },
      { title: 'Тип', value: 'Поворотный диск' },
      { title: 'Материал корпуса', value: 'Чугун' },
    ],
    rating: 4.5,
    reviewsCount: 13,
  }),
  makeProduct({
    id: 'p-023',
    slug: 'klapan-predohranitelnyy-dn40',
    name: 'Клапан предохранительный DN40',
    category: 'klapany',
    subcategory: 'Клапаны предохранительные',
    brand: 'Danfoss',
    price: 15600,
    description:
      'Пружинный предохранительный клапан для защиты систем отопления и водоснабжения от превышения давления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '40 мм' },
      { title: 'Давление настройки', value: '6 бар' },
      { title: 'Материал корпуса', value: 'Латунь' },
    ],
    rating: 4.9,
    reviewsCount: 24,
    popular: true,
  }),
  makeProduct({
    id: 'p-024',
    slug: 'klapan-balansirovochnyy-dn32',
    name: 'Клапан балансировочный DN32',
    category: 'klapany',
    subcategory: 'Клапаны балансировочные',
    brand: 'Danfoss',
    price: 21000,
    oldPrice: 24500,
    description: 'Ручной балансировочный клапан для точной настройки гидравлических режимов систем отопления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '32 мм' },
      { title: 'Материал корпуса', value: 'Латунь' },
      { title: 'Присоединение', value: 'Резьбовое' },
    ],
    rating: 4.7,
    reviewsCount: 10,
    new: true,
  }),

  // Фланцы
  makeProduct({
    id: 'p-025',
    slug: 'flanets-stalnoy-pn16-dn80',
    name: 'Фланец стальной PN16 DN80',
    category: 'flantsy',
    subcategory: 'Фланцы плоские',
    brand: 'ПТПА',
    price: 2400,
    description: 'Плоский стальной фланец для приварного соединения трубопроводной арматуры.',
    specifications: [
      { title: 'Диаметр (DN)', value: '80 мм' },
      { title: 'Давление (PN)', value: '16 бар' },
      { title: 'Материал', value: 'Сталь 09Г2С' },
      { title: 'Стандарт', value: 'ГОСТ 33259-2015' },
    ],
    rating: 4.6,
    reviewsCount: 19,
  }),
  makeProduct({
    id: 'p-026',
    slug: 'flanets-vorotnikovyy-pn25-dn100',
    name: 'Фланец воротниковый PN25 DN100',
    category: 'flantsy',
    subcategory: 'Фланцы воротниковые',
    brand: 'ПТПА',
    price: 4100,
    description: 'Воротниковый фланец повышенной прочности для трубопроводов высокого давления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '100 мм' },
      { title: 'Давление (PN)', value: '25 бар' },
      { title: 'Материал', value: 'Сталь 09Г2С' },
    ],
    rating: 4.7,
    reviewsCount: 15,
    popular: true,
  }),
  makeProduct({
    id: 'p-027',
    slug: 'flanets-ploskiy-pn10-dn50',
    name: 'Фланец плоский PN10 DN50',
    category: 'flantsy',
    subcategory: 'Фланцы плоские',
    brand: 'ПТПА',
    price: 1200,
    oldPrice: 1450,
    description: 'Плоский приварной фланец для стандартных систем водоснабжения и отопления низкого давления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '50 мм' },
      { title: 'Давление (PN)', value: '10 бар' },
      { title: 'Материал', value: 'Сталь Ст3' },
    ],
    rating: 4.4,
    reviewsCount: 23,
  }),

  // Компенсаторы
  makeProduct({
    id: 'p-028',
    slug: 'kompensator-silfonnyy-osevoy-dn50',
    name: 'Компенсатор сильфонный осевой DN50',
    category: 'kompensatory',
    subcategory: 'Компенсаторы сильфонные',
    brand: 'Tecofi',
    price: 18500,
    description: 'Сильфонный осевой компенсатор для гашения температурных удлинений трубопровода.',
    specifications: [
      { title: 'Диаметр (DN)', value: '50 мм' },
      { title: 'Ход компенсации', value: '±20 мм' },
      { title: 'Материал сильфона', value: 'Нержавеющая сталь' },
    ],
    rating: 4.6,
    reviewsCount: 7,
  }),
  makeProduct({
    id: 'p-029',
    slug: 'kompensator-rezinovyy-dn80',
    name: 'Компенсатор резиновый DN80',
    category: 'kompensatory',
    subcategory: 'Компенсаторы резиновые',
    brand: 'TIM',
    price: 9800,
    description: 'Резинотканевый компенсатор для гашения вибрации насосного оборудования и линейных смещений.',
    specifications: [
      { title: 'Диаметр (DN)', value: '80 мм' },
      { title: 'Материал', value: 'EPDM-резина, корд' },
      { title: 'Присоединение', value: 'Фланцевое' },
    ],
    rating: 4.5,
    reviewsCount: 14,
    popular: true,
  }),
  makeProduct({
    id: 'p-030',
    slug: 'kompensator-flantsevyy-dn100',
    name: 'Компенсатор фланцевый DN100',
    category: 'kompensatory',
    subcategory: 'Компенсаторы сильфонные',
    brand: 'Tecofi',
    price: 24500,
    description: 'Сильфонный компенсатор с фланцевым присоединением для магистральных теплосетей.',
    specifications: [
      { title: 'Диаметр (DN)', value: '100 мм' },
      { title: 'Давление (PN)', value: '16 бар' },
      { title: 'Материал', value: 'Нержавеющая сталь' },
    ],
    rating: 4.8,
    reviewsCount: 4,
    new: true,
    availability: 'on_order',
  }),

  // Фитинги
  makeProduct({
    id: 'p-031',
    slug: 'fiting-press-soedinenie-dn20',
    name: 'Фитинг пресс-соединение DN20',
    category: 'fitingi',
    subcategory: 'Пресс-фитинги',
    brand: 'Rehau',
    price: 720,
    description: 'Пресс-фитинг для быстрого и герметичного соединения металлопластиковых труб без резьбы.',
    specifications: [
      { title: 'Диаметр (DN)', value: '20 мм' },
      { title: 'Материал', value: 'Латунь никелированная' },
      { title: 'Монтаж', value: 'Пресс-инструмент' },
    ],
    rating: 4.7,
    reviewsCount: 38,
    popular: true,
  }),
  makeProduct({
    id: 'p-032',
    slug: 'ugolok-obzhimnoy-dn16',
    name: 'Уголок обжимной DN16',
    category: 'fitingi',
    subcategory: 'Обжимные фитинги',
    brand: 'Valtec',
    price: 340,
    description: 'Обжимной угловой фитинг 90° для металлопластиковых труб систем отопления и водоснабжения.',
    specifications: [
      { title: 'Диаметр (DN)', value: '16 мм' },
      { title: 'Угол', value: '90°' },
      { title: 'Материал', value: 'Латунь' },
    ],
    rating: 4.4,
    reviewsCount: 26,
  }),
  makeProduct({
    id: 'p-033',
    slug: 'nippel-dvoynoy-rezbovoy-dn25',
    name: 'Ниппель двойной резьбовой DN25',
    category: 'fitingi',
    subcategory: 'Резьбовые фитинги',
    brand: 'TIM',
    price: 260,
    oldPrice: 320,
    description: 'Двойной резьбовой ниппель для соединения элементов трубопровода с одинаковой резьбой.',
    specifications: [
      { title: 'Резьба', value: '1" наружная' },
      { title: 'Материал', value: 'Сталь оцинкованная' },
    ],
    rating: 4.3,
    reviewsCount: 17,
  }),

  // Трубы
  makeProduct({
    id: 'p-034',
    slug: 'truba-stalnaya-vgp-dn50',
    name: 'Труба стальная ВГП DN50',
    category: 'truby',
    subcategory: 'Трубы стальные',
    brand: 'БАЗ',
    price: 1450,
    unit: 'м',
    description: 'Водогазопроводная стальная труба общего назначения для отопления и водоснабжения.',
    specifications: [
      { title: 'Диаметр (DN)', value: '50 мм' },
      { title: 'Материал', value: 'Сталь 20' },
      { title: 'Толщина стенки', value: '3.5 мм' },
      { title: 'Стандарт', value: 'ГОСТ 3262-75' },
    ],
    rating: 4.6,
    reviewsCount: 61,
    popular: true,
  }),
  makeProduct({
    id: 'p-035',
    slug: 'truba-ppr-pn20-dn25',
    name: 'Труба ППР PN20 DN25',
    category: 'truby',
    subcategory: 'Трубы полипропиленовые',
    brand: 'Rehau',
    price: 620,
    unit: 'м',
    description: 'Полипропиленовая армированная труба для систем горячего водоснабжения и отопления.',
    specifications: [
      { title: 'Диаметр (DN)', value: '25 мм' },
      { title: 'Давление (PN)', value: '20 бар' },
      { title: 'Материал', value: 'PPR со стекловолокном' },
    ],
    rating: 4.7,
    reviewsCount: 45,
    new: true,
  }),
  makeProduct({
    id: 'p-036',
    slug: 'truba-profilnaya-nerzhaveyushaya-dn32',
    name: 'Труба профильная нержавеющая DN32',
    category: 'truby',
    subcategory: 'Трубы нержавеющие',
    brand: 'Tecofi',
    price: 2900,
    unit: 'м',
    description: 'Нержавеющая труба для пищевых и химически агрессивных сред, устойчива к коррозии.',
    specifications: [
      { title: 'Диаметр (DN)', value: '32 мм' },
      { title: 'Материал', value: 'AISI 304' },
    ],
    rating: 4.8,
    reviewsCount: 9,
  }),

  // Соединительные элементы
  makeProduct({
    id: 'p-037',
    slug: 'sgon-stalnoy-dn32',
    name: 'Сгон стальной DN32',
    category: 'soedinitelnye-elementy',
    subcategory: 'Сгоны',
    brand: 'TIM',
    price: 380,
    description: 'Стальной сгон для разъёмного резьбового соединения труб с возможностью демонтажа.',
    specifications: [
      { title: 'Диаметр (DN)', value: '32 мм' },
      { title: 'Материал', value: 'Сталь оцинкованная' },
    ],
    rating: 4.3,
    reviewsCount: 20,
  }),
  makeProduct({
    id: 'p-038',
    slug: 'kontrgayka-stalnaya-dn40',
    name: 'Контргайка стальная DN40',
    category: 'soedinitelnye-elementy',
    subcategory: 'Контргайки',
    brand: 'TIM',
    price: 210,
    oldPrice: 260,
    description: 'Контргайка для фиксации сгонов и резьбовых соединений трубопроводной арматуры.',
    specifications: [
      { title: 'Диаметр (DN)', value: '40 мм' },
      { title: 'Материал', value: 'Сталь оцинкованная' },
    ],
    rating: 4.2,
    reviewsCount: 31,
  }),
  makeProduct({
    id: 'p-039',
    slug: 'amerikanka-razyomnaya-dn25',
    name: 'Американка разъёмная DN25',
    category: 'soedinitelnye-elementy',
    subcategory: 'Американки',
    brand: 'Valtec',
    price: 890,
    description: 'Разъёмное резьбовое соединение («американка») с прокладкой для быстрого монтажа и демонтажа арматуры.',
    specifications: [
      { title: 'Диаметр (DN)', value: '25 мм' },
      { title: 'Материал', value: 'Латунь' },
      { title: 'Уплотнение', value: 'Паронитовая прокладка' },
    ],
    rating: 4.6,
    reviewsCount: 28,
    popular: true,
  }),

  // Запорная арматура
  makeProduct({
    id: 'p-040',
    slug: 'zatvor-diskovyy-povorotnyy-dn100',
    name: 'Затвор дисковый поворотный DN100',
    category: 'zapornaya-armatura',
    subcategory: 'Затворы дисковые',
    brand: 'Broen',
    price: 26500,
    description: 'Поворотный дисковый затвор с резиновым уплотнением для быстрого перекрытия магистральных трубопроводов.',
    specifications: [
      { title: 'Диаметр (DN)', value: '100 мм' },
      { title: 'Давление (PN)', value: '16 бар' },
      { title: 'Материал диска', value: 'Нержавеющая сталь' },
      { title: 'Привод', value: 'Рукоятка с фиксатором' },
    ],
    rating: 4.7,
    reviewsCount: 22,
    popular: true,
  }),
  makeProduct({
    id: 'p-041',
    slug: 'ventil-zapornyy-dn25',
    name: 'Вентиль запорный DN25',
    category: 'zapornaya-armatura',
    subcategory: 'Вентили',
    brand: 'Genebre',
    price: 3400,
    description: 'Латунный запорный вентиль для точного регулирования и перекрытия потока в бытовых системах.',
    specifications: [
      { title: 'Диаметр (DN)', value: '25 мм' },
      { title: 'Материал', value: 'Латунь' },
      { title: 'Макс. давление', value: '16 бар' },
    ],
    rating: 4.5,
    reviewsCount: 17,
    new: true,
  }),
  makeProduct({
    id: 'p-042',
    slug: 'kran-mayevskogo-12',
    name: 'Кран Маевского 1/2"',
    category: 'zapornaya-armatura',
    subcategory: 'Краны воздухоотводные',
    brand: 'Valtec',
    price: 320,
    oldPrice: 390,
    description: 'Кран Маевского для стравливания воздуха из радиаторов отопления и стояков систем водоснабжения.',
    specifications: [
      { title: 'Резьба', value: '1/2"' },
      { title: 'Материал', value: 'Латунь никелированная' },
    ],
    rating: 4.4,
    reviewsCount: 63,
    popular: true,
  }),
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((item) => item.id !== product.id && item.category === product.category)
    .slice(0, limit)
}
