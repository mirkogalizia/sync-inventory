// app/routes/_index/route.tsx

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "~/shopify.server";
import {
  Page,
  Layout,
  Card,
  Button,
  TextField,
  Heading,
  Text,
  InlineStack,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

export const loader: LoaderFunction = async ({ request }) => {
  // Forza l’OAuth se non sei loggato
  await authenticate.admin(request);
  return json({});
};

export default function Index() {
  useLoaderData(); // forza il loader

  return (
    <Page>
      <TitleBar title="Sync Inventory" />
      <Layout>
        {/* Intro */}
        <Layout.Section>
          <Card sectioned>
            <Heading>Benvenuto in Sync Inventory</Heading>
            <Text>
              Qui configuri i “blanks” per taglia, colore e tipologia, e sincronizzi
              automaticamente il magazzino al variare delle vendite.
            </Text>
          </Card>
        </Layout.Section>

        {/* Form di sincronizzazione */}
        <Layout.Section>
          <Card title="Avvia sincronizzazione" sectioned>
            <Form method="post" action="/api/sync">
              <InlineStack gap="4">
                <TextField
                  label="Dominio del negozio"
                  name="shop"
                  placeholder="tuo-store.myshopify.com"
                  autoComplete="off"
                />
                <Button primary submit>
                  Sincronizza
                </Button>
              </InlineStack>
            </Form>
          </Card>
        </Layout.Section>

        {/* Specs (opzionale) */}
        <Layout.Section secondary>
          <Card title="Specifiche progetto" sectioned>
            <Text>
              <strong>Framework:</strong> Remix
            </Text>
            <Text>
              <strong>Session storage:</strong> In-memory (test)
            </Text>
            <Text>
              <strong>Interfaccia:</strong> Polaris & App Bridge
            </Text>
            <Text>
              <strong>API:</strong> Admin GraphQL
            </Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

