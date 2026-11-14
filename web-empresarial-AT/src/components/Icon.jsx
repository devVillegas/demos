import {
  Compass,
  Code2,
  CloudCog,
  BrainCircuit,
  ShieldCheck,
  Headset,
  Rocket,
  Database,
  Users,
  ArrowRight,
  CheckCircle2,
  Trash2,
  X,
  Inbox,
  Send,
  Sparkles,
  Menu,
  Building2,
  Quote as QuoteIcon,
  Loader2
} from 'lucide-react'

const ICONS = {
  Compass,
  Code2,
  CloudCog,
  BrainCircuit,
  ShieldCheck,
  Headset,
  Rocket,
  Database,
  Users,
  ArrowRight,
  CheckCircle2,
  Trash2,
  X,
  Inbox,
  Send,
  Sparkles,
  Menu,
  Building2,
  Quote: QuoteIcon,
  Loader: Loader2
}

export default function Icon({ name, ...props }) {
  const Component = ICONS[name] || Sparkles
  return <Component {...props} />
}
