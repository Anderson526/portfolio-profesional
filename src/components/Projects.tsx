import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { GithubLogo, Globe, Folder } from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useKV } from '@github/spark/hooks'
import { useLanguage } from '@/hooks/use-language'
import { ProjectCard, Project as ProjectType } from './ProjectCard'
import logoAc from '@/img/projectsimg/logo_ac.png'
import icontecWebsite from '@/img/projectsimg/icontec_website.png'

const SAMPLE_PROJECTS: ProjectType[] = [
  {
    id: 'custom-admin',
    title: 'Custom Admin & White Label',
    description: 'White-label WordPress admin panel with role-based customizations and login branding.',
    longDescription: 'Plugin para personalizar la experiencia del administrador de WordPress con marca blanca, branding del login, ocultación de menús por rol y ajustes visuales del panel. Diseñado para clientes que requieren un entorno más profesional, privado y orientado a su identidad corporativa.',
    technologies: ['WordPress', 'PHP', 'CSS', 'jQuery', 'Admin UI', 'Security'],
    githubUrl: 'https://github.com/Anderson526/custom-adminAC',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'cpt-builder',
    title: 'Easy CPT & Taxonomy Builder',
    description: 'Visual tool to create custom post types and taxonomies without writing custom code.',
    longDescription: 'Sistema visual para crear Custom Post Types, taxonomías y configuraciones de contenido en WordPress sin depender de snippets manuales. Optimiza el desarrollo para sitios con estructuras complejas y facilita la administración para clientes no técnicos.',
    technologies: ['WordPress', 'PHP', 'Custom Post Types', 'Taxonomies', 'Admin Panel', 'MySQL'],
    githubUrl: 'https://github.com/Anderson526/cpt-builderAC',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'performance',
    title: 'Smart Performance & Optimizer',
    description: 'Performance plugin for lazy loading, script control and database cleanup.',
    longDescription: 'Complemento de optimización para WordPress con lazy load de videos e iframes, control de scripts innecesarios y limpieza segura de la base de datos. Su objetivo es mejorar tiempos de carga y mantener el sitio más liviano sin afectar la experiencia del usuario.',
    technologies: ['WordPress', 'PHP', 'JavaScript', 'Performance', 'Optimization', 'MySQL'],
    githubUrl: 'https://github.com/Anderson526/wpPerformanceAC',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'security',
    title: 'Core Security & Login Protector',
    description: 'Security hardening plugin to protect login, hide access URLs and block brute-force attempts.',
    longDescription: 'Plugin de seguridad para WordPress enfocado en endurecer la capa básica del sitio: ocultar el login, bloquear enumeración de usuarios, mitigar ataques de fuerza bruta y reforzar la protección del acceso administrativo con medidas sencillas y eficaces.',
    technologies: ['WordPress', 'PHP', 'Security', 'Authentication', 'WordPress Hooks', 'Admin UI'],
    githubUrl: 'https://github.com/Anderson526/wpSecurityAC',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'seo',
    title: 'Simple SEO & Meta Manager',
    description: 'SEO plugin for managing titles, meta descriptions and Open Graph tags from the editor.',
    longDescription: 'Herramienta para gestionar SEO on-page en WordPress desde el editor de bloques: títulos SEO, meta descriptions, Open Graph y Twitter Cards. Permite controlar el posicionamiento básico y la vista previa de contenido sin añadir complejidad al flujo editorial.',
    technologies: ['WordPress', 'PHP', 'Gutenberg', 'SEO', 'Open Graph', 'Metadata'],
    githubUrl: 'https://github.com/Anderson526/WPsimpleSeoAC',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'smtp-mailer',
    title: 'SMTP & Email Logger',
    description: 'SMTP delivery and email logging tool for WordPress mail reliability and monitoring.',
    longDescription: 'Plugin para enviar correos desde WordPress a través de SMTP y registrar cada envío para auditoría, diagnóstico y validación operativa. Permite controlar la entrega de notificaciones, errores y la reputación del dominio sin depender de configuraciones manuales complejas.',
    technologies: ['WordPress', 'PHP', 'PHPMailer', 'SMTP', 'MySQL', 'Email Delivery'],
    githubUrl: 'https://github.com/Anderson526/WPsmtpMailerAC',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'maintenance-mode',
    title: 'Icontec Maintenance Mode',
    description: 'Custom maintenance page with scheduling, roles and multilingual support.',
    longDescription: 'Plugin para activar una página de mantenimiento personalizada con roles permitidos, programación por cron, soporte multilenguaje y personalización visual. Ideal para mantenimiento técnico, lanzamiento de sitios o cambios de infraestructura sin interrumpir la administración.',
    technologies: ['WordPress', 'PHP', 'WP Cron', 'JavaScript', 'CSS', 'Multilanguage'],
    githubUrl: 'https://github.com/Anderson526/MaintenceModeWordpress',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'role-manager',
    title: 'Role Manager',
    description: 'Modular role and permission manager for WordPress user access control.',
    longDescription: 'Sistema modular para gestionar roles, usuarios, permisos por página y campos personalizados en WordPress. Permite controlar accesos con mayor precisión y mantener la seguridad del sitio organizado, escalable y fácil de administrar.',
    technologies: ['WordPress', 'PHP', 'ACL', 'Roles', 'Permissions', 'User Management'],
    githubUrl: 'https://github.com/Anderson526/RoleManagerWordpress',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'rest-api-toolkit',
    title: 'REST API Toolkit',
    description: 'WordPress and WooCommerce API toolkit with auth, validation, docs and rate limiting.',
    longDescription: 'Kit de infraestructura REST para WordPress y WooCommerce con enrutamiento propio, autenticación, validación, rate limiting, logging, documentación OpenAPI y gestión de API keys. Diseñado para integrar servicios externos y crear soluciones con APIs más robustas y seguras.',
    technologies: ['WordPress', 'PHP', 'REST API', 'WooCommerce', 'API Keys', 'OpenAPI'],
    githubUrl: 'https://github.com/Anderson526/RESTAPIToolkit',
    liveUrl: 'https://anderson526.github.io/portfolio-profesional/',
    imageUrl: logoAc
  },
  {
    id: 'E-Commerce',
    title: 'E-Commerce Platform for Icontec',
    description: 'A modern, full-featured online marketplace with real-time inventory and payment processing.',
    longDescription: 'Built a comprehensive e-commerce solution featuring real-time inventory management, secure payment processing with Stripe, advanced search and filtering, order tracking, and an admin dashboard. The platform handles thousands of concurrent users with optimized performance and caching strategies.',
    technologies: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://tienda.icontec.org/',
    imageUrl: icontecWebsite
  }
]

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)
  const [projects, setProjects] = useKV<ProjectType[]>('portfolio-projects', [])
  const { t } = useLanguage()
  
  useEffect(() => {
    if (!projects || projects.length === 0) {
      setProjects(SAMPLE_PROJECTS)
    }
  }, [projects, setProjects])
  
  const projectsList = projects || []

  return (
    <>
      <section id="projects" ref={ref} className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-12">
              <Folder size={32} className="text-accent" weight="duotone" />
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: '-0.01em' }}>
                {t('projects.title')}
              </h2>
            </div>

            {projectsList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-center py-20"
              >
                <Folder size={64} className="text-muted-foreground mx-auto mb-4" weight="duotone" />
                <p className="text-xl text-muted-foreground">{t('projects.noProjects')}</p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsList.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isInView={isInView}
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
          {selectedProject && (
            <>
              {selectedProject.imageUrl && (
                <div className="w-full h-56 overflow-hidden rounded-md mb-4">
                  <img
                    src={selectedProject.imageUrl}
                    alt={t(`projectsData.${selectedProject.id}.title`) || selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">{t(`projectsData.${selectedProject.id}.title`) || selectedProject.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-base mt-2">
                  {t(`projectsData.${selectedProject.id}.description`) || selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">{t('projects.aboutProject')}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`projectsData.${selectedProject.id}.longDescription`) || selectedProject.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">{t('projects.technologiesUsed')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <Badge 
                        key={tech}
                        variant="secondary"
                        className="bg-primary/20 border border-accent/20 text-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                  >
                    <GithubLogo size={20} weight="fill" className="mr-2" />
                    {t('projects.viewCode')}
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-accent/50 hover:bg-accent/10"
                    onClick={() => window.open(selectedProject.liveUrl, '_blank')}
                  >
                    <Globe size={20} weight="fill" className="mr-2" />
                    {t('projects.liveDemo')}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
