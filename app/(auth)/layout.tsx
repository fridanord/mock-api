// AuthLayout är en enkel layoutkomponent som bara returnerar sina barn, den används för att omsluta alla sidor under /start så att de kan dela samma layout och logik i AuthShell-komponenten.
// Notera att mappen (auth) är en "grouping folder" som inte påverkar URL-strukturen, så sidorna under /start kommer fortfarande att vara tillgängliga på /start/login och /start/register.
// så (auth) är bara en organisatorisk mapp för att hålla relaterade komponenter
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return children;
}