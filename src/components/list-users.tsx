'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SquarePen } from 'lucide-react';
import { listUsers } from '@/services/users';
import Image from 'next/image';
import { ProfileIcon } from '@/assets';

export interface Contact {
	name: string;
	id: string;
	email: string;
	avatar: string;
}

export function ListUserButton() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedContact, setSelectedContact] = useState<Contact | null>(
		null
	);
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function fetchContacts() {
		try {
			setIsLoading(true);
			const response = await listUsers();
			setContacts(response);
		} catch (error) {
			console.error('Failed to fetch contacts:', error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchContacts();
	}, []);

	const toggleContactSelection = (contact: Contact) => {
		if (selectedContact?.id === contact.id) {
			setSelectedContact(null);
		} else {
			setSelectedContact(contact);
		}
	};

	const filteredContacts = contacts.filter((contact) =>
		contact.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<SquarePen className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Lista de Contatos</DialogTitle>
					<DialogDescription>
						Busque o contato que deseja conversar
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<Input
						type="text"
						id = "search-bar"
						placeholder="Buscar contato"
						onChange={(e) => setSearchQuery(e.target.value)}
						value={searchQuery}
						className="w-full"
					/>

					{isLoading ? (
						<div className="py-8 text-center text-muted-foreground">
							Carregando contatos...
						</div>
					) : contacts.length === 0 ? (
						<div id= "empty-msg" className="py-8 text-center text-muted-foreground">
							Não há contatos cadastrados
						</div>
					) : filteredContacts.length === 0 ? (
						<div id="empty-src" className="py-8 text-center text-muted-foreground">
							Contato não encontrado
						</div>
					) : (
						<ScrollArea className="h-[250px] rounded-md border">
							<div className="space-y-1 p-1">
								{filteredContacts.map((contact) => (
									<button
										key={contact.id}
										onClick={() =>
											toggleContactSelection(contact)
										}
										className={`w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors ${
											selectedContact?.id === contact.id
												? 'bg-primary text-primary-foreground'
												: 'hover:bg-muted'
										}`}
									>
										<Image
											src={
												contact.avatar ||
												ProfileIcon
											}
											alt={`${contact.name}'s avatar`}
											className="w-10 h-10 rounded-full object-cover"
											width={40}
											height={40}
										/>
										<div className="flex-1 overflow-hidden">
											<p className="font-medium truncate">
												{contact.name}
											</p>
											<p className="text-sm truncate text-muted-foreground">
												{contact.email}
											</p>
										</div>
									</button>
								))}
							</div>
						</ScrollArea>
					)}
				</div>

				<DialogFooter>
					<Button type="submit" disabled={!selectedContact}>
						Conversar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
