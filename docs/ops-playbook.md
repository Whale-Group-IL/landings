# Ops Playbook — Whale Digital Landings

Инструкции для команды Whale Digital по операционной работе с платформой.

---

## 1. Привязка домена клиента (noplanculture.co.il и аналоги)

### Предусловие
Домен уже добавлен в Cloudflare — его NS-серверы указывают на Cloudflare.

### Шаги

1. Открой [Cloudflare Dashboard](https://dash.cloudflare.com) → выбери нужный аккаунт
2. Слева → **Workers & Pages** → `whale-landings`
3. Вкладка **Settings** → раздел **Domains & Routes**
4. Нажми **Add** → выбери **Custom Domain**
5. Введи домен: `noplanculture.co.il` → **Add Domain**
6. Повтори для `www.noplanculture.co.il`
7. Дождись статуса **Active** (обычно 1-5 минут)

### Добавить конфиг в KV

После привязки домена — убедись, что в KV есть ключ для этого домена:

```bash
# Из корня проекта
export CLOUDFLARE_API_TOKEN=<token>
npx wrangler kv key put --binding=TENANTS_KV --remote "noplanculture.co.il" "$(cat tenants/noplanculture.json)"
npx wrangler kv key put --binding=TENANTS_KV --remote "www.noplanculture.co.il" "$(cat tenants/noplanculture.json)"
```

**Готово** — `https://noplanculture.co.il` работает.

---

## 2. Подключение нового клиента

### Получили заполненный JSON от клиента

1. Сохрани файл в `tenants/{tenant-id}.json`
2. Если есть фото — положи в `public/tenants/{tenant-id}/`
3. Загрузи конфиг в KV (для домена клиента):

```bash
export CLOUDFLARE_API_TOKEN=<token>

# По домену (для работы на реальном домене)
npx wrangler kv key put --binding=TENANTS_KV --remote "client-domain.com" "$(cat tenants/{tenant-id}.json)"
npx wrangler kv key put --binding=TENANTS_KV --remote "www.client-domain.com" "$(cat tenants/{tenant-id}.json)"

# По slug (для работы /preview/{tenant-id})
npx wrangler kv key put --binding=TENANTS_KV --remote "{tenant-id}" "$(cat tenants/{tenant-id}.json)"
```

4. Если добавлены новые фото в `public/` — нужен редеплой:

```bash
npm run build && npx wrangler deploy 2>&1
```

5. Привяжи домен клиента (см. раздел 1 выше)

### Обновить конфиг существующего клиента

Просто обнови KV — редеплой **не нужен** (если не менялись статические файлы):

```bash
export CLOUDFLARE_API_TOKEN=<token>
npx wrangler kv key put --binding=TENANTS_KV --remote "client-domain.com" "$(cat tenants/{tenant-id}.json)"
```

Изменения видны **мгновенно**.

---

## 3. Ссылки для показа потенциальным клиентам

Эти ссылки работают без привязки домена:

| Ссылка | Описание |
|--------|----------|
| `https://landings.whaledigital.co.il/preview/_template-expert-ru` | Шаблон «Эксперт» на русском |
| `https://landings.whaledigital.co.il/preview/_template-expert-he` | Шаблон «Эксперт» на иврите |
| `https://landings.whaledigital.co.il/preview/_template-expert-en` | Шаблон «Эксперт» на английском |
| `https://landings.whaledigital.co.il/preview/noplanculture` | Лендинг Тимура Колпина (демо) |

> Примечание: пока `landings.whaledigital.co.il` не настроен — используй workers.dev:  
> `https://whale-landings.michael-17d.workers.dev/preview/_template-expert-ru`

---

## 4. Настройка аналитики

### Google Analytics 4

1. Зайди в [analytics.google.com](https://analytics.google.com) → создай новый ресурс для клиента
2. Получи **Measurement ID** — вид `G-XXXXXXXXXX`
3. Добавь в конфиг клиента:

```json
"analytics": {
  "gaId": "G-XXXXXXXXXX"
}
```

4. Обнови KV (редеплой не нужен):

```bash
npx wrangler kv key put --binding=TENANTS_KV --remote "client-domain.com" "$(cat tenants/{tenant-id}.json)"
```

> GA4-скрипт автоматически добавляется на страницу если `gaId` не пустой.

### Meta (Facebook) Pixel

1. В [Meta Business Manager](https://business.facebook.com) → Events Manager → создай Pixel для клиента
2. Получи **Pixel ID** — числовой код
3. Добавь в конфиг:

```json
"analytics": {
  "gaId": "G-XXXXXXXXXX",
  "fbPixelId": "123456789012345"
}
```

### PostHog (опционально, для продуктовой аналитики)

1. Создай проект на [posthog.com](https://posthog.com) (есть бесплатный план)
2. Получи **API Key** вид `phc_xxxx`
3. Добавь в конфиг:

```json
"analytics": {
  "posthogKey": "phc_xxxxxxxxxxxxxxxxxxxx"
}
```

---

## 5. CRM — куда приходят заявки

По умолчанию заявки отправляются на webhook в WhaleBizCRM.

### Настроить URL для клиента

В конфиге клиента:

```json
"crm": {
  "source": "noplanculture-landing",
  "webhookUrl": "https://crm.whaledigital.co.il/api/leads/noplanculture"
}
```

Если `webhookUrl` не указан — используется глобальный `CRM_WEBHOOK_URL` из `wrangler.jsonc`.

### Формат данных заявки

```json
{
  "name": "Имя клиента",
  "phone": "+972501234567",
  "source": "noplanculture-landing",
  "timestamp": "2026-04-11T10:30:00Z"
}
```

---

## 6. Полезные команды

```bash
# Посмотреть все KV ключи
npx wrangler kv key list --binding=TENANTS_KV --remote

# Прочитать конкретный ключ
npx wrangler kv key get --binding=TENANTS_KV --remote "noplanculture.co.il"

# Удалить ключ
npx wrangler kv key delete --binding=TENANTS_KV --remote "old-domain.com"

# Задеплоить новую версию кода
npm run build && npx wrangler deploy

# Посмотреть логи в реальном времени
npx wrangler tail --format=pretty
```

---

## 7. Переменные окружения

| Переменная | Где задаётся | Описание |
|-----------|-------------|----------|
| `CLOUDFLARE_API_TOKEN` | Локально (export) | Токен для wrangler CLI |
| `CRM_WEBHOOK_URL` | `wrangler.jsonc` → vars | Глобальный URL для лидов |
| `NEXT_PUBLIC_BASE_URL` | `wrangler.jsonc` → vars | Базовый URL сайта |
| `TENANT_DEV_HOST` | `.env.local` | Какой тенант показывать локально на `localhost:3000` |
