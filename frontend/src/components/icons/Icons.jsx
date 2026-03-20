import React from 'react';
import {
    Archive,
    AlertTriangle,
    CalendarClock,
    Check,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Database,
    Facebook,
    FileText,
    FolderOpen,
    Instagram,
    Languages,
    Linkedin,
    ListTodo,
    Plus,
    Search,
    Sparkles,
    Star,
    Trash2,
    Twitter,
    Undo2,
    Upload,
    User,
    X,
    Youtube,
} from 'lucide-react';

// --- UI Icons ---
export const SearchIcon = ({ size = 20 }) => <Search size={size} strokeWidth={2.2} />;
export const ProfileIcon = ({ size = 22 }) => <User size={size} strokeWidth={2} />;
export const UploadIcon = ({ size = 28 }) => <Upload size={size} strokeWidth={2} />;
export const DatabaseIcon = ({ size = 28 }) => <Database size={size} strokeWidth={2} />;
export const ArchiveIcon = ({ size = 28 }) => <Archive size={size} strokeWidth={2} />;
export const CheckIcon = ({ size = 14 }) => <Check size={size} strokeWidth={3} />;
export const CloseIcon = ({ size = 22 }) => <X size={size} strokeWidth={2.2} />;
export const TrashIcon = ({ size = 18 }) => <Trash2 size={size} strokeWidth={2} />;
export const PlusIcon = ({ size = 18 }) => <Plus size={size} strokeWidth={2.5} />;

// --- Dashboard-specific icons ---
export const WarningIcon = ({ size = 18 }) => <AlertTriangle size={size} strokeWidth={2.2} />;
export const OverdueIcon = ({ size = 20 }) => <AlertTriangle size={size} strokeWidth={2} />;
export const DeadlineIcon = ({ size = 20 }) => <CalendarClock size={size} strokeWidth={2} />;
export const DocumentIcon = ({ size = 20 }) => <FolderOpen size={size} strokeWidth={2} />;
export const TodoIcon = ({ size = 20 }) => <ListTodo size={size} strokeWidth={2} />;
export const FileIcon = ({ size = 18 }) => <FileText size={size} strokeWidth={2} />;
export const StarIcon = ({ size = 18, filled = false }) => (
    <Star size={size} strokeWidth={2} fill={filled ? 'currentColor' : 'none'} />
);
export const ChevronLeftIcon = ({ size = 16 }) => <ChevronLeft size={size} strokeWidth={2.5} />;
export const ChevronRightIcon = ({ size = 16 }) => <ChevronRight size={size} strokeWidth={2.5} />;
export const CompletedIcon = ({ size = 16 }) => <CheckCircle2 size={size} strokeWidth={2.2} />;
export const PendingIcon = ({ size = 16 }) => <Clock3 size={size} strokeWidth={2.2} />;
export const UndoIcon = ({ size = 16 }) => <Undo2 size={size} strokeWidth={2.2} />;
export const LanguageIcon = ({ size = 14 }) => <Languages size={size} strokeWidth={2.2} />;
export const SparklesIcon = ({ size = 16 }) => <Sparkles size={size} strokeWidth={2.2} />;

// --- Social Media Icons ---
export const FacebookIcon = ({ size = 20 }) => <Facebook size={size} strokeWidth={2} />;
export const InstagramIcon = ({ size = 20 }) => <Instagram size={size} strokeWidth={2} />;
export const TwitterIcon = ({ size = 20 }) => <Twitter size={size} strokeWidth={2} />;
export const LinkedInIcon = ({ size = 20 }) => <Linkedin size={size} strokeWidth={2} />;
export const YouTubeIcon = ({ size = 20 }) => <Youtube size={size} strokeWidth={2} />;

// Helper to get urgency CSS class
export const getUrgencyClass = (urgency) => {
    switch (urgency) {
        case 'High':
            return 'urgency-high';
        case 'Medium':
            return 'urgency-medium';
        default:
            return 'urgency-low';
    }
};
