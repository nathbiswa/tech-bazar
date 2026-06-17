"use client";

import { imagUpload } from "@/lib/actions/imageUpload";
import { addProducts } from "@/lib/api/products";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export default function AddProductsModal() {
    console.log(process.env.NEXT_PUBLIC_SERVER_URL)
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const image = await imagUpload(data.image);
        const products = {
            ...data,
            image: image.url
        }

        const result = await addProducts(products);
        console.log(result)
    }
    return (
        <Modal>
            <Button variant="secondary">Add Products</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Envelope className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Products</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <TextField className="w-full" name="title" type="text" variant="secondary">
                                        <Label>Title</Label>
                                        <Input placeholder="Enter your Product Title" />
                                    </TextField>
                                    <TextField className="w-full" name="price" type="number" variant="secondary">
                                        <Label>Price</Label>
                                        <Input placeholder="Price" />
                                    </TextField>
                                    <TextField className="w-full" name="quantity" variant="secondary">
                                        <Label>Quantity</Label>
                                        <Input placeholder="Quantity" />
                                    </TextField>
                                    <TextField className="w-full" type="file" variant="secondary">
                                        <Label>Image</Label>
                                        <input name="image" type="file" placeholder="Enter your email" />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close">Send Message</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}