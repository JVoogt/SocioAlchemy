# CLAUDE.md — SocioAlchemy

## Hard Rules

- Static site only — pure HTML/CSS/JS, no frameworks, no build tools
- Never modify `site/` files without reading them first
- Never commit credentials, keys, or personal contact details
- Images live in `site/images/` — never serve from root
- DNS must point to DockPi public IP (`169.1.19.55`) not domains.co.za forwarding

## Authority & Links

- Brand manual: [`docs/brand-manual.md`](docs/brand-manual.md)
- Brand voice: [`docs/brand-voice.md`](docs/brand-voice.md)
- Portfolio assets: [`docs/portfolio.md`](docs/portfolio.md)
- Website plan: [`docs/website-plan.md`](docs/website-plan.md)
- Live site: https://socioalchemy.co.za
- Container: `socioalchemy` on DockPi (`192.168.0.120:8270`)
- Traefik route: `/home/voogiepi/docker/traefik/config/dynamic/socioalchemy.yml`
- Docker compose: [`docker/docker-compose.yml`](docker/docker-compose.yml)

## Setup / Test

```bash
# Test locally (DockPi)
curl -s -o /dev/null -w "%{http_code}" http://192.168.0.120:8270/

# Check container status
ssh -i ~/.ssh/id_voogiepi voogiepi@192.168.0.120 'DOCKER_API_VERSION=1.41 docker ps | grep socioalchemy'

# Check Traefik cert errors
ssh -i ~/.ssh/id_voogiepi voogiepi@192.168.0.120 'DOCKER_API_VERSION=1.41 docker logs traefik --tail 20 2>&1 | grep -i "socioalchemy\|acme"'
```

## Workflow

```bash
# Deploy site changes to DockPi
rsync -av --delete /home/jpvoogt/Documents/_Code/SocioAlchemy/site/ voogiepi@192.168.0.120:/home/voogiepi/docker/socioalchemy/site/

# Deploy config changes (nginx or traefik)
rsync -av /home/jpvoogt/Documents/_Code/SocioAlchemy/docker/ voogiepi@192.168.0.120:/home/voogiepi/docker/socioalchemy/docker/

# Restart container after config change
ssh -i ~/.ssh/id_voogiepi voogiepi@192.168.0.120 'cd /home/voogiepi/docker/socioalchemy/docker && DOCKER_API_VERSION=1.41 docker compose restart'

# Verify image is served
curl -s -o /dev/null -w "%{http_code}" http://192.168.0.120:8270/images/hero-portrait.jpg
```

## Stop Conditions

- DNS/registrar changes → confirm with JP before touching
- Any external posting (social, email, public) → ask first
- Unsure which brand asset to use → check `docs/brand-manual.md` before guessing
- Port-forwarding or router changes → ask JP
