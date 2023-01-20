import GitHubIcon from "tabler-icons/brand-github.tsx";
import GitLabIcon from "tabler-icons/brand-gitlab.tsx";
import DiscordIcon from "tabler-icons/brand-discord.tsx";
import GoogleIcon from "tabler-icons/brand-google.tsx";
import JavaScriptIcon from "tabler-icons/brand-javascript.tsx";
import FreshIcon from "tabler-icons/lemon-2.tsx";
import DenoIcon from "tabler-icons/brand-deno.tsx";
import SupabaseIcon from "tabler-icons/bolt.tsx";

import SearchIcon from "tabler-icons/search.tsx";
import ArrowLeftIcon from "tabler-icons/arrow-left.tsx";
import SettingsIcon from "tabler-icons/settings.tsx";
import AppsIcon from "tabler-icons/apps.tsx";
import ListIcon from "tabler-icons/list.tsx";
import InfoCircle from "tabler-icons/info-circle.tsx";
import CirclePlusIcon from "tabler-icons/circle-plus.tsx";
import TrashIcon from "tabler-icons/trash.tsx";
import NewsIcon from "tabler-icons/news.tsx";
import UsersIcon from "tabler-icons/users.tsx";
import CodeIcon from "tabler-icons/code.tsx";
import MovieIcon from "tabler-icons/movie.tsx";
import MusicIcon from "tabler-icons/music.tsx";
import ToolIcon from "tabler-icons/tool.tsx";
import BriefcaseIcon from "tabler-icons/briefcase.tsx";
import GamepadIcon from "tabler-icons/device-gamepad-2.tsx";
import HeartIcon from "tabler-icons/heart.tsx";
import HeartsIcon from "tabler-icons/hearts.tsx";
import BrokenHeartIcon from "tabler-icons/heart-broken.tsx";
import HomeIcon from "tabler-icons/home.tsx";
import FlagIcon from "tabler-icons/flag.tsx";
import FileDescriptionIcon from "tabler-icons/file-description.tsx";
import DownloadIcon from "tabler-icons/download.tsx";
import ExternalLink from "tabler-icons/external-link.tsx";
import CheckIcon from "tabler-icons/check.tsx";
import LaptopIcon from "tabler-icons/device-laptop.tsx";
import Mobile from "tabler-icons/device-mobile.tsx";
import LockIcon from "tabler-icons/lock.tsx";
import SourceCodeIcon from "tabler-icons/source-code.tsx";
import CloudOffIcon from "tabler-icons/cloud-off.tsx";
import UserIcon from "tabler-icons/user.tsx";
import LoginIcon from "tabler-icons/login.tsx";
import ArrowBigDownLineIcon from "tabler-icons/arrow-big-down-line.tsx";
import LogoutIcon from "tabler-icons/logout.tsx";
import DownloadOffIcon from "tabler-icons/download-off.tsx";

export const ICONS = new Map([
	["github", GitHubIcon],
	["gitlab", GitLabIcon],
	["discord", DiscordIcon],
	["google", GoogleIcon],
	["javascript", JavaScriptIcon],
	["fresh", FreshIcon],
	["deno", DenoIcon],
	["supabase", SupabaseIcon],
	["search", SearchIcon],
	["back", ArrowLeftIcon],
	["settings", SettingsIcon],
	["apps", AppsIcon],
	["list", ListIcon],
	["info", InfoCircle],
	["plus", CirclePlusIcon],
	["trash", TrashIcon],
	["news", NewsIcon],
	["users", UsersIcon],
	["code", CodeIcon],
	["movie", MovieIcon],
	["music", MusicIcon],
	["tool", ToolIcon],
	["briefcase", BriefcaseIcon],
	["gamepad", GamepadIcon],
	["heart", HeartIcon],
	["hearts", HeartsIcon],
	["broken-heart", BrokenHeartIcon],
	["home", HomeIcon],
	["flag", FlagIcon],
	["file-description", FileDescriptionIcon],
	["download", DownloadIcon],
	["external-link", ExternalLink],
	["check", CheckIcon],
	["laptop", LaptopIcon],
	["mobile", Mobile],
	["lock", LockIcon],
	["source-code", SourceCodeIcon],
	["cloud-off", CloudOffIcon],
	["user", UserIcon],
	["login", LoginIcon],
	["arrow-big-down-line", ArrowBigDownLineIcon],
	["logout", LogoutIcon],
	["download-off", DownloadOffIcon],
]);

export interface Props {
	size?: number;
	name: string;
	class?: string;
	inline?: boolean;
	color?: string;
}

export default function Icon(props: Props) {
	const { size, name, class: className, inline, color } = props;
	const Icon = ICONS.get(name);

	if (!Icon) {
		return <div />;
	}

	return (
		<Icon
			class={`${inline ? "inline align-middle" : ""} ${className || ""}`}
			size={size}
			color={color}
		/>
	);
}
